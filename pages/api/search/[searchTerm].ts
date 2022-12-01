import { client } from "./../../../utils/client";
import { NextApiResponse, NextApiRequest } from "next";
import { searchPostsQuery } from "../../../utils/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { searchTerm } = req.query;

    if (searchTerm) {
      const videosQuery = searchPostsQuery(searchTerm);
      const videos = await client.fetch(videosQuery);
      res.status(200).json(videos);
    }
  }
};

export default handler;
