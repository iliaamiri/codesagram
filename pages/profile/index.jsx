import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]";
import {stringyAndParser} from "../../lib/helpers";
import {usersRepository} from "../../lib/users/repository";
import Post from "../../components/Post";
import Comments from "../../components/Comments";
import SiteNavigation from "../../components/SiteNavigation";

export default function Profile({ user, host }) {
    const router = useRouter();

    const [posts, setPosts] = useState(undefined)
    const [comments, setComments] = useState(undefined)

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
        await navigator.clipboard.writeText(`http://${host}/posts/view/${postId}`)
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get("/api/user/profile")
                const {data} = result
                setPosts(() => {
                    data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    return [...data.posts]
                })
                setComments([...data.comments])
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])


    const PostsSection = () => {
        if (!posts) {
            return <div>Loading...</div>
        }

        if (posts.length === 0) {
            return <div>No posts</div>
        }

        return posts.map((post) => (
            <Post
                key={post.id}
                post={post}
                user={post.author}
                href={`/posts/view/${post.id}`}
                like={user && post.postLikes.some(p => p.authorId === user.id)}
                onLike={likeHandler}
                onComment={commentHandler}
                onShare={shareHandler}
            />
        ))
    }

    const CommentsSection = () => {
        if (!comments) {
            return <div>Loading...</div>
        }

        if (comments.length === 0) {
            return <div>No comments</div>
        }

        return <Comments comments={comments ?? []} />
    }

    return (
        <>
            <SiteNavigation user={user ?? null} />

            <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">

                <div className='max-w-2xl mx-auto'>

                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Profile
                    </h1>

                    <hr className="mt-2 mb-6" />

                    <h2 className="text-1xl font-extrabold tracking-tight text-gray-100 sm:text-2xl">
                        Posts
                    </h2>

                    <PostsSection />

                    <h2 className="text-1xl font-extrabold tracking-tight text-gray-100 sm:text-2xl">
                        Comments
                    </h2>

                    <CommentsSection />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    return {
        props: {
            user: (session?.user) ? stringyAndParser(await usersRepository.getUserByEmail(session.user.email)) : null,
            host: context.req.headers.host
        },
    }
}