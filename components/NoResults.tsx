import { NextPage } from "next";
import React from "react";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

type Props = {
  text: string;
  commentSection?: boolean;
};

const NoResults: NextPage<Props> = ({ text, commentSection }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {commentSection ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
