import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import Telenovela from "@/app/lib/models/telenovela";

export const GET = async (req) => {
  try {
    await mongoosedb();

    // extract ?title= from query
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Please provide a title" },
        { status: 400 }
      );
    }

    // partial + case-insensitive search
    const series = await Telenovela.find({
      title: { $regex: title, $options: "i" },
    }).limit(10);

    return NextResponse.json({ success: true, series });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
};
