import Artist from "../../models/Artist";
import { validateRoute } from "../../lib/auth";
import connectDB from "../../config/database";

// GET api/artist
export default validateRoute(async (req, res, user) => {
  await connectDB();
  const artists = await Artist.find({});

  res.json(artists);
});
