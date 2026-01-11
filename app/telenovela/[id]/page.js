
import React from 'react'
import Main from './Main'


export async function generateMetadata({ params }) {

  const detail = await params
  const id = detail?.id
  

  try {
    const res = await fetch(`https://letstream.site/api/getseries?id=${id}`, {
      cache: "no-store", // always fetch fresh
    });

    if (!res.ok) throw new Error("Failed to fetch series metadata");

    const data = await res.json();
    const series = data.series || {};

    return {
      title: `${series.title || "Telenovela"} - Letstream Telenovela`,
      description: series.description || "Watch the latest telenovela episodes on Letstream with english subtitles and dubs.",
      openGraph: {
        title: `${series.title || "Telenovela"} - Letstream`,
        description: series.description || "Watch the latest telenovela episodes on Letstream with english subtitles and dubs.",
        url: `https://letstream.site/telenovela/${id}`,
        type: "video.tv_show",
        images: [
          {
            url: series.coverImage || "/opengraph-image.png",
            width: 800,
            height: 1200,
            alt: series.title || "Telenovela",
          },
        ],
      },
        keywords:['english telenovela','english telemundo','telenovela dub','telenovela english dub', 'telenovela english','telenovela sub', 'telenovela english sub','telenovela english subtitle', 'telenovela subtitle','spanish series','telemundo' ,'movie streaming',"download spanish series","download second chance","download telenovalas","download telenovalas with subtitle"]
      ,
      twitter: {
        card: "summary_large_image",
        title: `${series.title || "Telenovela"} - Letstream`,
        description: series.description || "Watch the latest telenovela episodes on Letstream with english subtitles and dubs.",
        images: [series.coverImage || "/opengraph-image.png"],
      },
      alternates: {
        canonical: `https://letstream.site/telenovela/${id}`,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    return {
      title: "Telenovela - Letstream",
      description: "Watch the latest telenovela episodes on Letstream with english subtitles and dubs.",
    };
  }
}

const page = async({params}) => {
  const param = await params
  const id = param.id
  return (
    <><Main id={id}/></>
  )
}

export default page


