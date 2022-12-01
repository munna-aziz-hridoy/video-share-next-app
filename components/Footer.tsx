import { NextPage } from "next";
import React from "react";

import { FooterList } from "./";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

type Props = {};

const Footer: NextPage<Props> = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <FooterList items={footerList1} mt={false} />
      <FooterList items={footerList2} mt />
      <FooterList items={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">2022 MUNNA TIKTIK</p>
    </div>
  );
};

export default Footer;
