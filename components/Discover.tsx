import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";
import { NextPage } from "next";

type Props = {};

const Discover: NextPage<Props> = () => {
  const router = useRouter();

  const {
    query: { topic },
  } = router;

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item, i) => (
          <Link key={i} href={`/?topic=${item.name}`}>
            <div
              className={`${
                topic === item.name
                  ? "hover:bg-primary xl:border-[#f51997]  text-[#f51997] "
                  : "hover:bg-primary xl:border-gray-300  text-black"
              } flex items-center gap-2 justify-center px-3 py-2 rounded xl:rounded-full cursor-pointer xl:border-2`}
            >
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
