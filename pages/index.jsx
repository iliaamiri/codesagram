import Button from "../components/Button";
import {useRouter} from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"
import NavBar from "../components/NavBar";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession()

  return (
      <>
        <NavBar navigation={[
            {name: "Home", href: "/", current: true},
        ]} onSignIn={signIn} onSignOut={signOut} user={session?.user ?? null}  />
        <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">

          <div className='max-w-2xl mx-auto'>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                <Button onClick={() => router.push('/posts/create')}>Create new Post</Button>
            </h1>

          </div>
        </div>
      </>
  )
}
