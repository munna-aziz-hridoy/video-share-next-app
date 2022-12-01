import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoVerified } from "react-icons/go";
import { NoResults, VideoCard } from "../../components";
import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

type Props = {
  videos: Video[];
};

const Search: NextPage<Props> = ({ videos }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const {
    query: { searchTerm },
  }: any = useRouter();

  const { allUsers } = useAuthStore();

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className=" my-10 border-b-2 border-gray-200 bg-white w-full  flex gap-10 relative">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-gray-400 mb-[-1px] z-10 ${
            isAccounts && "border-b-2 border-black text-black"
          }`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 text-gray-400 mb-[-1px] z-10 ${
            !isAccounts && "border-b-2 border-black text-black"
          }`}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-16">
          {searchAccounts.length > 0 ? (
            searchAccounts.map((user: IUser, i: number) => (
              <div>
                <Link key={user._id} href={`/profile/${user?._id}`}>
                  <div className="flex gap-3 p-2 cursor-pointer font-semibold border-b-2 border-gray-200 my-5">
                    <div className="w-16 h-16">
                      <Image
                        width={64}
                        height={64}
                        alt="Profile"
                        src={user.image}
                        className="rounded-full  w-16 h-16"
                      />
                    </div>
                    <div className="block">
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
              </div>
            ))
          ) : (
            <NoResults text={`No video results for "${searchTerm}"`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video, i) => <VideoCard post={video} key={i} />)
          ) : (
            <NoResults text={`No video results for "${searchTerm}"`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: data },
  };
};

export default Search;
