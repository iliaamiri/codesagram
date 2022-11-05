import { useSession, signIn, signOut } from "next-auth/react"
import NavBar from "../components/NavBar";
export default function Profile() {
  const { data: session } = useSession()

  return (
    <>
        <NavBar navigation={[
            {name: "Home", href: "/", current: true},
        ]} onSignIn={signIn} onSignOut={signOut} user={session?.user ?? null}  />
    </>
  )
}