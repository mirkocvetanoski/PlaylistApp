// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/database";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await connectDB();
    res.status(200).json({ message: "Hello World!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
}
