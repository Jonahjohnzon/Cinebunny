import { Schema, models, model } from "mongoose";

const EpisodeSchema = new Schema({
  episodeNumber: { type: Number, required: true },
  season: { type: Number, default: 1 },
  url:{type:String, required: true}
}, { timestamps: true });

const TelenovelaSchema = new Schema({
  title: { type: String, required: true },
  status:{type: String, required: true, default: "coming soon" },
  description: { type: String },
  genre: [{ type: String }], // e.g. ["Drama", "Romance"]
  releaseYear: { type: Number },
  seasons: { type: Number, default: 1 },
  Image:{type:String},
  coverImage: { type: String }, // poster/cover image
  rating: { type: Number, min: 0, max: 10 },
  episodes: [EpisodeSchema], // embeds all episodes
}, { timestamps: true });

const Telenovela = models.Telenovela || model("Telenovela", TelenovelaSchema);
export default Telenovela;
