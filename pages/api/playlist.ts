import Playlist from "../models/Playlist";
import { validateRoute } from "../lib/auth";

// GET api/playlist
export default validateRoute(async (req, res, user) => {
  const playlists = await Playlist.find({ user: user.id }).sort({ name: 1 });

  res.json(playlists);
});
