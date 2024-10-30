import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/database";
import Playlist from "../../models/Playlist";

type ResponseData = {
  message: string;
};

// GET api/playlists/route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const playlists = await Playlist.find({});

      res.status(200).json({ playlists });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
}
