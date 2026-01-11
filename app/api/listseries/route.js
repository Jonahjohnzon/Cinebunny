// /app/api/getseries/route.js
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const GET = async (req) => {
  try {
    await mongoosedb();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1; // default page = 1
    const limit = 20; // 20 series per page
    const skip = (page - 1) * limit;

    // Count all series
    const totalSeries = await Telenovela.countDocuments();

    // Fetch series for the requested page
    const series = await Telenovela.find({})
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      series,
      totalSeries,
      totalPages: Math.ceil(totalSeries / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("❌ Error fetching series:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch series" },
      { status: 500 }
    );
  }
};
