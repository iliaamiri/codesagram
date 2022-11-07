import NavBar from "../components/NavBar";
import {signIn, signOut} from "next-auth/react";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {usersRepository} from "../lib/users/repository";
import {stringyAndParser} from "../lib/helpers";
import Button from "../components/Button";
import {useRouter} from "next/router";
import axios from "axios";
import {useEffect, useState} from "react";
import PostSmall from "../components/PostSmall";
import SiteNavigation from "../components/SiteNavigation";

export default function PostsIndex({ user }) {
    const router = useRouter()

    const [posts, setPosts] = useState()

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

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get("/api/posts")
                console.log(result)
                setPosts(() => [...result.data])
            } catch (e) {
                console.log(e)
            }

        })()
    }, [])

    return (
        <>
            <SiteNavigation user={user ?? null} />

            <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
                <div className='max-w-2xl mx-auto'>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Posts
                    </h1>
                    <Button className={'mb-10'} onClick={() => router.push('/posts/create')}>Create new Post</Button>

                    {
                        Array.isArray(posts) ? (
                            <>
                                {
                                    posts.length > 0 ? (
                                        <>
                                            {
                                                posts.map((post) => (
                                                    <PostSmall
                                                        key={post.id}
                                                        href={`/posts/view/${post.id}`}
                                                        post={post}
                                                        user={post.author}
                                                        liked={user && post.postLikes.some(p => p.authorId === user.id)}
                                                        onLike={likeHandler}
                                                        onComment={commentHandler}
                                                        onShare={shareHandler} />
                                                ))
                                            }
                                        </>
                                    ) :
                                        <p>No posts yet</p>
                                }
                            </>
                        ) :
                            (
                                <div className="text-center">
                                    <p className="text-2xl font-bold">Loading...</p>
                                </div>
                            )
                    }

                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    return {
        props: {
            user: (session?.user) ? stringyAndParser(await usersRepository.getUserByEmail(session.user.email)) : null
        },
    }
}