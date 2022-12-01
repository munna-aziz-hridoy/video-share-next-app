import { NextApiResponse, NextApiRequest } from "next";
import { client } from "../../../utils/client";
import { allUsersQuery } from "../../../utils/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const data = await client.fetch(allUsersQuery());
    console.log(data);
    if (data) {
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
};
export default handler;
