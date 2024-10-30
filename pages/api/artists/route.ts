import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../config/database";
import Artist from "../../models/Artist";

type ResponseData = {
  message: string;
};

// GET api/artists/route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const artists = await Artist.find({});

      res.status(200).json({ artists });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
}
