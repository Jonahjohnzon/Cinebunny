"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const store = await cookies();

  // Loop through all cookies and delete them
  store.getAll().forEach((cookie) => {
    store.delete(cookie.name);
  });

  return NextResponse.json({ success: true, message: "All cookies deleted" });
}
