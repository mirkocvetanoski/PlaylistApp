import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const cookie = require("cookie");
import connectDB from "../../config/database";
import User from "../models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password, username } = req.body;

  let user;

  try {
    await connectDB();

    user = new User({
      email,
      password: bcrypt.hashSync(password, salt),
      username,
    });

    await user.save();
  } catch (error) {
    res.status(401);
    res.json({ error: "User already exists!" });
    return;
  }

  const token = jwt.sign(
    { email: user.email, id: user.id, time: Date.now() },
    "hello",
    { expiresIn: "8h" }
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
};
