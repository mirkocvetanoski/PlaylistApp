import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const cookie = require("cookie");
import connectDB from "../../config/database";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  await connectDB();

  const user = await User.findOne({ email: email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "hello",
      {
        expiresIn: "8h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Email or Password is wrong!" });
  }
};
