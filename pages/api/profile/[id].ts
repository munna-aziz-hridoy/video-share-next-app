import { client } from "./../../../utils/client";
import { NextApiResponse, NextApiRequest } from "next";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const query = singleUserQuery(id);
      const userVideosQuery = userCreatedPostsQuery(id);
      const userLikedVideosQuery = userLikedPostsQuery(id);

      const user = await client.fetch(query);
      const userVideos = await client.fetch(userVideosQuery);
      const userLikedVideos = await client.fetch(userLikedVideosQuery);

      res.status(200).json({ user: user[0], userVideos, userLikedVideos });
    }
  }
};

export default handler;
