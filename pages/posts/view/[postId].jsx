import {useRouter} from "next/router";
import {createRef, useEffect, useState} from "react";
import {signIn, signOut} from "next-auth/react";
import NavBar from "../../../components/NavBar";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]";
import {postsRepository} from "../../../lib/posts/repository";
import {stringyAndParser} from "../../../lib/helpers";
import {usersRepository} from "../../../lib/users/repository";
import Post from "../../../components/Post";
import axios from "axios";
import CommentForm from "../../../components/CommentForm";
import Comments from "../../../components/Comments";

export default function ViewPost({ user }) {
    const router = useRouter();
    const { postId } = router.query;

    const [post, setPost] = useState(null);

    const likeHandler = async (postId) => {
        try {
            const result = await axios.post("/api/posts/like", {postId})
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    const commentHandler = async (postId) => {
        await router.push(`/posts/view/${postId}`)
    }

    const shareHandler = async (postId) => {

    }

    const handleSubmitComment = async ({comment, setComment}) => {
        try {
            const result = await axios.post("/api/comments/create", {postId, comment})
            console.log(result)
            setPost((prevPost) => {
                return {
                    ...prevPost,
                    comments: [...prevPost.comments, result.data]
                }
            })
            setComment("")
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            if (postId) {
                try {
                    const result = await axios.get(`/api/posts/view/${postId}`)
                    console.log(result)
                    setPost(result.data)
                } catch (e) {
                    console.log(e)
                }
            }
        })()
    }, []);

    return (
        <>
            <NavBar navigation={[
                {name: "Home", href: "/", current: false},
                {name: "Posts", href: "/posts", current: true},
            ]} onSignIn={signIn} onSignOut={signOut} user={user ?? null}  />

            <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
                <div className='max-w-2xl mx-auto'>
                    <h1 className="pb-10 text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Post View
                    </h1>
                    {
                        (post) ? (
                            <Post
                                post={post}
                                user={post.author}
                                liked={user && post.postLikes.some(p => p.authorId === user.id)}
                                onLike={likeHandler}
                                onComment={commentHandler}
                                onShare={shareHandler}
                            />
                        ) : (
                            <div>loading...</div>
                        )
                    }

                    {
                        user && (
                            <CommentForm onSubmit={handleSubmitComment} user={user} />
                        )
                    }

                    <Comments comments={post?.comments ?? []} />
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const posts = await postsRepository.getAll()
    console.log(posts)
    return {
        props: {
            user: (session?.user) ? stringyAndParser(await usersRepository.saveToDbFromSession(session.user)) : null
        },
    }
}