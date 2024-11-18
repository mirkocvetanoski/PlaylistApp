import { Schema, model, models } from "mongoose";

const SongSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of song is required"],
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    duration: {
      type: Number,
    },
    url: {
      type: String,
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
