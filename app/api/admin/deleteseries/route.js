"use server";
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const DELETE = async (req) => {
  try {
    await mongoosedb();
    const { searchParams } = new URL(req.url);
    const seriesId = searchParams.get("id"); 
      // telenovela ID

    if (!seriesId) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Series ID missing" }),
        { status: 400 }
      );
    }

    // Try deleting the series
    const deleted = await Telenovela.findByIdAndDelete(seriesId);

    if (!deleted) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Series not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Series deleted successfully",
        data: deleted,
      }),
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
