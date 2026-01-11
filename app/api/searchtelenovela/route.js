import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const GET = async (req) => {
  try {
    await mongoosedb();

    // extract query params
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const page = parseInt(searchParams.get("page") || "1", 10); // default page 1
    const limit = 20;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Please provide a title" },
        { status: 400 }
      );
    }

    // count total matches
    const totalSeries = await Telenovela.countDocuments({
      title: { $regex: title, $options: "i" },
    });

    // calculate pagination
    const totalPages = Math.ceil(totalSeries / limit);
    const skip = (page - 1) * limit;

    // fetch with pagination
    const series = await Telenovela.find({
      title: { $regex: title, $options: "i" },
    })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      series,
      pagination: {
        page,
        totalPages,
        totalSeries,
        perPage: limit,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
};
