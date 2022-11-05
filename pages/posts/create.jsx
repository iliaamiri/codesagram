import {signIn, signOut, useSession} from "next-auth/react";
import NavBar from "../../components/NavBar";
import NewPostForm from "../../components/NewPostForm";

export default function CreatePost() {
    const { data: session } = useSession()

    const handleSubmit = () => {

    }

    const handleChange = (codeValue) => {}

    return (
        <>
            <NavBar navigation={[
                {name: "Home", href: "/", current: true},
            ]} onSignIn={signIn} onSignOut={signOut} user={session?.user ?? null}  />

            <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
                <div className='max-w-2xl mx-auto'>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Create new Post
                    </h1>
                    <NewPostForm onSubmit={handleSubmit} onChange={handleChange} />
                </div>
            </div>

        </>
    )
}
