import {signIn, signOut, useSession} from "next-auth/react";
import NavBar from "../../components/NavBar";
import NewPostForm from "../../components/NewPostForm";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import SiteNavigation from "../../components/SiteNavigation";

export default function CreatePost() {
    const { data: session } = useSession()

    const router = useRouter();

    const [code, setCode] = useState("")

    const handleSubmit = async () => {
        try {
            const result = await axios.post("/api/posts/create", {code})
            await router.push(`/posts/view/${result.data.id}`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <SiteNavigation user={session?.user ?? null} />

            <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">
                <div className='max-w-2xl mx-auto'>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Create new Post
                    </h1>
                    <NewPostForm onSubmit={handleSubmit} onChange={(codeValue) => setCode(codeValue)} />
                </div>
            </div>

        </>
    )
}
