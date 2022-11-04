import Button from "../components/Button";
import {useRouter} from "next/router";
import {getUrlRequestUserGitHubIdentity} from "../lib/githubAuth";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {

  }

  return (
    <div className="pt-8 pb-10 lg:pt-12 lg:pb-14 mx-auto max-w-7xl px-2">

      <div className='max-w-2xl mx-auto'>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl">
          <span className="block">Welcome to</span>
          <span className="block text-indigo-300">Your Assignment</span>
          <Button onClick={() => router.push(getUrlRequestUserGitHubIdentity())}>
            Click Me
          </Button>
        </h1>

      </div>
    </div>
  )
}
