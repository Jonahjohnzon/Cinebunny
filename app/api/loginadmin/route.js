"use server";
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import User from "@/app/lib/models/user";
import { cookies } from "next/headers";
import * as yup from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(4, "Password must be at least 4 characters"),
});

export const POST = async (req) => {
  try {
    const dataReq = await req.json();
    await mongoosedb();
    await loginSchema.validate(dataReq);

    const emailinfo = dataReq.email.toUpperCase();
    const info = await User.findOne({ email: emailinfo });

    if (!info) {
      return NextResponse.json({ success: false, message: "Email not found" }, { status: 404 });
    }
    // ✅ Ensure only admins can log in
    if (info.role !== 'admin') {
      return NextResponse.json({ success: false, message: "Not authorized as admin" }, { status: 403 });
    }

    const result = await bcrypt.compare(dataReq.password, info.password);
    if (!result) {
      return NextResponse.json({ success: false, message: "Wrong password" }, { status: 401 });
    }

    // ✅ Generate JWT
    const id = info._id;
    const token = jwt.sign({ id, role: "admin" }, process.env.DB_JWTS, { expiresIn: "30d" });

    // ✅ Set secure cookie
    (await cookies()).set("adminToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const userdata = {
      user_name: info.user_name,
      _id: info._id,
      role: info.role,
    };

    return NextResponse.json({ success: true, data: userdata, token });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ success: false, message: "Error logging in admin" }, { status: 500 });
  }
};
