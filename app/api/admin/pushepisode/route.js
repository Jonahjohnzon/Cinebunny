"use server";
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const PUT = async (req) => {
  try {
    await mongoosedb();
     const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // series/telenovela ID
    const newEpisode = await req.json();

    // 1. Find the series
    const seriesData = await Telenovela.findById(id);
    if (!seriesData) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Series not found" }),
        { status: 404 }
      );
    }

    // 2. Find index of existing episode
    const existingIndex = seriesData.episodes.findIndex(
      (ep) =>
        ep.season === newEpisode.season &&
        ep.episodeNumber === newEpisode.episodeNumber
    );

    if (existingIndex !== -1) {
      // ✅ Replace the existing episode
      seriesData.episodes[existingIndex] = {
        ...seriesData.episodes[existingIndex]._doc, // keep old fields if not provided
        ...newEpisode,
      };
    } else {
      // ✅ Add new episode
      seriesData.episodes.push(newEpisode);

      // ✅ Sort episodes by season then episodeNumber
      seriesData.episodes.sort((a, b) => {
        if (a.season === b.season) {
          return a.episodeNumber - b.episodeNumber;
        }
        return a.season - b.season;
      });
    }

    // 3. Save
    await seriesData.save();

    return new NextResponse(
      JSON.stringify({ success: true, data: seriesData }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
};
