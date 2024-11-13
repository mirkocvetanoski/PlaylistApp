import connectDB from "../../config/database";
import { validateRoute } from "../lib/auth";

export default validateRoute((req, res, user) => {
  await connectDB();
  res.json(user);
});
