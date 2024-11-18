import Playlist from "../models/Playlist";
import { validateRoute } from "../../lib/auth";
import connectDB from "../../config/database";

// GET api/playlist
export default validateRoute(async (req, res, user) => {
  await connectDB();
  const playlists = await Playlist.find({ user: user.id }).sort({ name: 1 });

  res.json(playlists);
});
