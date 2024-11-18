import Artist from "../../models/Artist";
import { validateRoute } from "../../lib/auth";
import connectDB from "../../config/database";

// GET api/artist
export default validateRoute(async (req, res) => {
  try {
    await connectDB();
    const artists = await Artist.find({});

    res.json(artists);
  } catch (error) {
    res.json({ status: 404 }, { message: "Something went wrong" });
  }
});
