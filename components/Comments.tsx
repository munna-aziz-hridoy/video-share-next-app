import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { NoResults } from "./";

type Props = {
  comment: string;
  isPostingComment: boolean;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: Comment[];
};

interface Comment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments: NextPage<Props> = ({
  comment,
  comments,
  setComment,
  addComment,
  isPostingComment,
}) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length > 0 ? (
          comments.map((comment, i) => (
            <>
              {" "}
              {allUsers.map(
                (user: IUser) =>
                  user._id ===
                    (comment.postedBy._id || comment.postedBy._ref) && (
                    <div className="p-2 px-10 mt-3 items-center" key={i}>
                      <Link key={user._id} href={`/profile/${user?._id}`}>
                        <div className="flex gap-3 items-start">
                          <div className="w-8 h-8">
                            <Image
                              width={34}
                              height={34}
                              alt="Profile"
                              src={user.image}
                              className="rounded-full  w-[34px] h-[34px]"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="flex gap-1 items-center text-xs capitalize  text-gray-400">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet!" commentSection />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
              placeholder="Add comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-gray-300 w-[250px] md:w-[700px] lg:w-[350px] flex-1 rounded-lg"
            />
            <button onClick={addComment} className="text-md text-gray-400">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
