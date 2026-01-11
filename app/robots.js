export default function robots() {
  const baseURL = process.env.NEXT_PUBLIC_URL
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/watch", "/admin", "/telestream", "/stream"], // 🚫 block these paths
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
