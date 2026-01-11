import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

// PATCH = update series info (without touching episodes)
export const PATCH = async (req) => {
  try {
    await mongoosedb();
     const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 
    const updateFields  = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Series ID is required" },
        { status: 400 }
      );
    }

    // Prevent updating episodes accidentally
    delete updateFields.episodes;

    const updatedSeries = await Telenovela.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedSeries) {
      return NextResponse.json(
        { success: false, message: "Series not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, series: updatedSeries },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update series error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
