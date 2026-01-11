import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.DB_JWTS);
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export const middleware = async (req) => {
  try {
    const { pathname } = req.nextUrl;
 
    // ✅ Prefer adminToken if available
    let token = req.cookies.get("adminToken")?.value || req.cookies.get("accessToken")?.value;
    let isAdminRoute = pathname.startsWith("/api/admin");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please login" },
        { status: 401 }
      );
    }

    const verifyWithJWTS = await verifyToken(token);
    // ✅ If accessing admin route, enforce role check
    if (isAdminRoute && verifyWithJWTS.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admins only" },
        { status: 403 }
      );
    }

    // ✅ Admins can pass user routes as well
    const rqheader = new Headers(req.headers);
    rqheader.set("user_id", verifyWithJWTS.id);
    rqheader.set("role", verifyWithJWTS.role);

    return NextResponse.next({ request: { headers: rqheader } });
  } catch (err) {
    console.error(err);
    
    return NextResponse.json(
      { success: false, message: "Unauthorized", error: err.message },
      { status: 401 }
    );
  }
};

export const config = {
  matcher: [
    "/api/pushhistory",
    "/api/getuser",
    "/api/gethistory",
    "/api/pushwishlist",
    "/api/getwishlist",
    "/api/deletewishlist",
    "/api/wishlistid",
    "/api/admin/:path*", // ✅ admins-only routes
  ],
};
