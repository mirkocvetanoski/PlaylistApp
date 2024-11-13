import { Schema, model, models } from "mongoose";

const PlaylistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Playlist name is required"],
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Playlist = models.Playlist || model("Playlist", PlaylistSchema);

export default Playlist;
