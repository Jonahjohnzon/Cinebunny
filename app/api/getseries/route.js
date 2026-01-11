// /app/api/getseriesbyid/route.js
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const GET = async (req) => {
  try {
    await mongoosedb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Series ID is required" },
        { status: 400 }
      );
    }

    const series = await Telenovela.findById(id);
    
    if (!series) {
      return NextResponse.json(
        { success: false, message: "Series not found" },
        { status: 404 }
      );
    }

    const totalEpisodes = series.episodes ? series.episodes.length : 0;

    return NextResponse.json({ success: true, series, totalEpisodes });
  } catch (err) {
    console.error("❌ Error fetching series:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch series" },
      { status: 500 }
    );
  }
};
