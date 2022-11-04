import { useSession, signIn, signOut } from "next-auth/react"
export default function Profile() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <img src={session.user.image} alt="" />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}