import connectDB from "../../config/database";
import { validateToken } from "../lib/auth";
import Playlist from "../models/Playlist";

const PlaylistPage = ({ playlist }) => {
  console.log(playlist);
  return <div>{playlist.name}</div>;
};

export const getServerSideProps = async ({ query, req }) => {
  await connectDB();

  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await Playlist.find({ _id: query.id, user: id });

  return {
    props: {
      playlist: JSON.parse(JSON.stringify(playlist)),
    },
  };
};

export default PlaylistPage;
