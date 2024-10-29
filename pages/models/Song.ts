import { Schema, model, models } from "mongoose";

const SongSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Song = models.Song || model("Song", SongSchema);

export default Song;
