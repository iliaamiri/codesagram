import NextLink from "next/link"
import NextImage from "next/image"

import PostActions from "../PostActions"

import formatTimeAgo from "../../lib/utils/formatTimeAgo"
import highlight from "../../lib/utils/highlight"

import { twMerge } from "tailwind-merge"

export default function PostSmall({ onLike, onComment, onShare, href, post, liked, user, Image = NextImage, Link = NextLink, className = "" }) {

  return (
    <div className={twMerge('lex flex-col overflow-hidden rounded-lg shadow-lg', className)}>

      <div className="flex flex-1 flex-col justify-between p-6 pb-3">
        <Link
          href={href}
        >
            <div className="mt-2 flex items-center">
              <div className="flex-shrink-0 text-gray-100">
                {user?.image &&
                  <Image
                    className="h-12 w-12 rounded-full"
                    src={user.image}
                    width={50}
                    height={50}
                    alt=""
                  />
                }
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-100">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-300">{formatTimeAgo(post.createdAt)}</p>
                </div>
                <div className="flex-1 mt-1">
                  <p className="text-xl font-semibold text-gray-100">
                    {post.postTitle.substring(0, 50)}
                  </p>

                </div>
              </div>
            </div>
            <pre className="mt-4 mx-5 max-h-52 overflow-hidden border-b border-gray-700 whitespace-pre-wrap break-words">
              {post.language ?
                <code className={`language-${post.language}`} dangerouslySetInnerHTML={{ __html: highlight(post.code, post.language) }} ></code>
                :
                <code>{post.code}</code>
              }
            </pre>
        </Link>
      </div>
      <div className="flex flex-col items-center pb-3">
        <PostActions
            post={post}
            onComment={onComment}
            onLike={onLike}
            onShare={onShare}
            liked={liked}
            totalComments={post.comments.length}
            totalLikes={post.postLikes.length} />
      </div>

    </div>
  )
}