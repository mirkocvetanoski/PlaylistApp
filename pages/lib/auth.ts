import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/User";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello");
        user = await User.findOne({ id: id });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");
  return user;
};
