import { ChatBubbleBottomCenterTextIcon as CommentIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import {useState} from "react";

export default function PostActions({ onComment, onLike, onShare, totalLikes, totalComments, liked, post, className = "" }) {
    const [totalLikesState, setTotalLikesState] = useState(totalLikes)
    const [isLiked, setIsLiked] = useState(liked)

    const toggleLiked = () => setIsLiked((prev) => !prev)

  return (
    <div className={'flex items-center justify-between ' + className}>
      <button
        onClick={() => onComment(post.id)}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
      >
        <span>{totalComments}</span>
        <CommentIcon className="h-7 w-7" aria-hidden="true" />
      </button>
      <button
        onClick={() => {
            onLike(post.id)
            setTotalLikesState((prev) => !isLiked ? prev + 1 : prev - 1)
            toggleLiked()
        }}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
      >
        <span>{totalLikesState}</span>
        {
          !isLiked ? <HeartIcon className="h-7 w-7" aria-hidden="true" />
            : <HeartIconSolid className="h-7 w-7" aria-hidden="true" />
        }
      </button>
      <button
        onClick={() => onShare(post.id)}
        className="flex flex-col items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:outline-none text-gray-400 hover:text-gray-500"
      >
        <span>&nbsp;</span>
        <ArrowUpTrayIcon className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  )
}