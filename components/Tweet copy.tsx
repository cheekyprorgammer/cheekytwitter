import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  tweet: Tweet;
};

function Tweet({ tweet }: Props) {
  const [loaded, setLoaded] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxvisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    const refreshComments = async () => {
      const comments: Comment[] = await fetchComments(tweet._id);
      setComments(comments);
    };

    refreshComments();
    setLoaded(true);
  }, [tweet._id]);

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      userName: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
    };

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addComment`,
      {
        body: JSON.stringify(comment),
        method: "POST",
      }
    );

    console.log("WOOHOO we made it", result);
    toast.success("Comment Posted!", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxvisible(false);
    refreshComments();
  };

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          src={tweet?.profileImg}
          className="w-10 h-10 rounded-full object-cover"
          alt={tweet?.text}
        />

        <div className="flex flex-col space-x-1">
          <div className="flex items-center gap-2">
            <p className="mr-1 font-bold">{tweet?.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet?.username.replace(/\s+/g, "").toLowerCase()} ·
            </p>

            <TimeAgo
              date={tweet?._createdAt}
              className="text-sm text-gray-500"
            />
          </div>
          <p className="">{tweet?.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt={tweet.text}
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div
          onClick={() => session && setCommentBoxvisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form onClick={handleSubmit} className="mt-3 flex space-x-3">
          <input
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            disabled={input.length <= 0}
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 object-cover rounded-full"
                alt={comment.userName}
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.userName}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.userName.replace(/\s+/g, "").toLowerCase()} ·
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
