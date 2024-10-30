import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/database";
import Song from "../../models/Song";

type ResponseData = {
  message: string;
};

// GET api/songs/route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const songs = await Song.find({});

      res.status(200).json({ songs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
}
