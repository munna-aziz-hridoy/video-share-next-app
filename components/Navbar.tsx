import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import logo from "../utils/tiktik-logo.png";
import { NextPage } from "next";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

type Props = {};

const Navbar: NextPage<Props> = () => {
  const { userProfile, addUser, removeUser }: any = useAuthStore();

  const [searchValue, setsearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          className="absolute md:static top-10 -left-20 bg-white"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            onClick={() => {}}
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10 items-center">
            <Link href="/upload">
              <button className="border-2 py-1 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block capitalize">upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href={`/profile/${userProfile?._id}`}>
                <Fragment>
                  <Image
                    width={40}
                    height={40}
                    alt="Profile"
                    src={userProfile?.image}
                    className="rounded-full w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                  />
                </Fragment>
              </Link>
            )}
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              type="button"
              className="rounded-full shadow-lg p-1.5 border border-gray-100"
            >
              <AiOutlineLogout color="red" fontSize={22} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser);
            }}
            onError={() => {
              console.log("error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
