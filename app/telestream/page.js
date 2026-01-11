"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../Loading";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "nextjs-toploader/app";

function StreamContent() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");
  const router = useRouter();
  const adLink = "https://poawooptugroo.com/4/8808782";



  if (!link) return <div></div>;

  // Convert voe.sx embed link to direct download
  const downloadLink = link.replace("/e/", "/") + "/download";

    const handleDownload = () => {
    window.open(adLink);
    router.push(downloadLink);
  };

  const handleBack = () => {
    window.open(adLink);
    router.back();
  };

  return (
    <div className="h-[100dvh] w-[100vw] flex flex-col">
      {/* Header Section */}
      <div className="h-[15%] sm:h-[10%] flex items-center justify-between px-6">
        {/* Back Button */}
        <div
          className="flex text-4xl items-center cursor-pointer"
           onClick={handleBack}
        >
          <IoArrowBack />
        </div>

        {/* Download Button */}
          <button
          onClick={handleDownload}
          className="px-2 sm:px-4 py-2 font-semibold rounded-md sm:mr-5 bg-black border-[1px] border-white flex items-center cursor-pointer"
        >
          DOWNLOAD
        </button>
      </div>

      {/* Video Player Section */}
      <div className="h-[85%] sm:h-[90%] w-full">
        <section className="w-full h-full">
          <iframe
            referrerPolicy="origin"
            className="w-full h-full select-none outline-none"
            src={link}
            title="video player"
            allowFullScreen
          ></iframe>
        </section>
      </div>
    </div>
  );
}

export default function TelestreamPage() {
  return (
    <Suspense fallback={<div><Loading /></div>}>
      <StreamContent />
    </Suspense>
  );
}

// 🚨 This tells Next.js not to prerender
export const dynamic = "force-dynamic";
