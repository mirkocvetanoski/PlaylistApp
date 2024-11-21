import connectDB from "../../config/database";
import { validateRoute } from "../../lib/auth";

export default validateRoute(async (req, res, user) => {
  await connectDB();
  res.json(user);
});
