"use server";
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const DELETE = async (req) => {
  try {
    await mongoosedb();

    const { searchParams } = new URL(req.url);
    const seriesId = searchParams.get("id");  // telenovela ID
    const { season, episodeNumber } = await req.json();

    // 1. Find series
    const seriesData = await Telenovela.findById(seriesId);
    if (!seriesData) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Series not found" }),
        { status: 404 }
      );
    }

    // 2. Filter out the episode
    const beforeCount = seriesData.episodes.length;
    seriesData.episodes = seriesData.episodes.filter(
      (ep) =>
        !(ep.season === season && ep.episodeNumber === episodeNumber)
    );

    // 3. If no episode was removed
    if (seriesData.episodes.length === beforeCount) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Episode not found",
        }),
        { status: 404 }
      );
    }

    // 4. Save updated series
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
