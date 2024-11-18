import Playlist from "../../models/Playlist";
import { validateRoute } from "../../lib/auth";
import connectDB from "../../config/database";

// GET api/playlist
export default validateRoute(async (req, res, user) => {
  try {
    await connectDB();
    const playlists = await Playlist.find({ user: user.id }).sort({ name: 1 });
    res.json(playlists);
  } catch (error) {
    res.json({ status: 404 }, { message: "Something went wrong" });
  }
});
