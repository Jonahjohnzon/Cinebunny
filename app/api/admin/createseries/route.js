"use server";
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const POST = async (req) => {
  try {
    await mongoosedb();

    const seriesData = await req.json();
    // Check if a series with same title + releaseYear already exists
    const alreadyExists = await Telenovela.findOne({
      title: seriesData.title,
      releaseYear: seriesData.releaseYear,
    });

    if (alreadyExists) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Series already exists",
          id: alreadyExists._id,
        }),
        { status: 200 }
      );
    }

    // Create new series
    const newSeries = await Telenovela.create(seriesData);

    return new NextResponse(
      JSON.stringify({ success: true, data: newSeries }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
};
