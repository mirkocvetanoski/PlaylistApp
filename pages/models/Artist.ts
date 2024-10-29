import { Schema, model, models } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      unique: true,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Artist = models.Artist || model("Artist", ArtistSchema);

export default Artist;
