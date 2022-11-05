import NavBar from "../../components/NavBar";
import {signIn, signOut, useSession} from "next-auth/react";
import {postsRepository} from "../../lib/posts/repository";
import Post from "../../components/Post";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]";
import {usersRepository} from "../../lib/users/repository";
import {stringyAndParser} from "../../lib/helpers";
import Button from "../../components/Button";

export default function PostsIndex({ posts, user }) {



    return (
        <>
            <NavBar navigation={[
                {name: "Home", href: "/", current: false},
                {name: "Posts", href: "/posts", current: true},
            ]} onSignIn={signIn} onSignOut={signOut} user={user ?? null}  />

            <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
                <div className='max-w-2xl mx-auto'>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Posts
                    </h1>
                    <Button onClick={() => router.push('/posts/create')}>Create new Post</Button>

                    {posts?.map((post) => (
                        <Post key={post.id} post={post} user={post.author} liked={user && post.postLikes.some(p => p.authorId === user.id)} />
                    ))}
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const posts = await postsRepository.getAll()
    console.log(posts)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            user: (session?.user) ? stringyAndParser(await usersRepository.saveToDbFromSession(session.user)) : null
        },
    }
}