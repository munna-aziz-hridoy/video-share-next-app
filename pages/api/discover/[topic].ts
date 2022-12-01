import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { topicPostsQuery } from "../../../utils/queries";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { topic }: any = req.query;
    const videoQuery = topicPostsQuery(topic);
    const videos = await client.fetch(videoQuery);

    res.status(200).json(videos);
  }
};

export default handler;
