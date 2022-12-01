import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { VideoCard, NoResults } from "../../components";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

type Props = {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
};

const Profile: NextPage<Props> = ({
  data: { user, userVideos, userLikedVideos },
}) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [userVideos, userLikedVideos, showUserVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 bg-white w-full">
        <div className="">
          <Image
            width={100}
            height={100}
            alt="Profile"
            src={user.image}
            className="rounded-full  w-[100px] h-[100px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex tracking-wider gap-1 items-center text-xl font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="flex gap-1 items-center text-sm capitalize  text-gray-500">
            {user.userName}
          </p>
        </div>
      </div>

      {/* video tab */}

      <div className=" my-10 border-b-2 border-gray-200 bg-white w-full  flex gap-10 relative">
        <p
          onClick={() => setShowUserVideos(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-gray-400 mb-[-1px] z-10 ${
            showUserVideos && "border-b-2 border-black text-black"
          }`}
        >
          Videos
        </p>
        <p
          onClick={() => setShowUserVideos(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-gray-400 mb-[-1px] z-10 ${
            !showUserVideos && "border-b-2 border-black text-black"
          }`}
        >
          Liked
        </p>
      </div>
      <div className="flex gap-6 flex-wrap md:justify-start">
        {videosList.length > 0 ? (
          videosList.map((post: Video, i: number) => (
            <VideoCard post={post} key={i} />
          ))
        ) : (
          <NoResults text="No Videos Found..." />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data },
  };
};

export default Profile;
