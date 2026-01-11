"use client";
import { DeleteWish, getUserWishlist } from "@/app/history";
import React, { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { IoArrowBack } from "react-icons/io5";
import TitleBar from "@/app/Component/TitleBar";
import MovieBlock from "../../Pages/MovieBlock";
import Loading from "../../Loading";
import Pagination from "@/app/[type]/[genre]/[country]/[date]/[sort]/[page]/Component/Pagination";

const MainBody = ({page}) => {
  const router = useRouter();
  const [WishVideos, setWishVidoes] = useState([]);
  const [load, setload] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  
  const GET = async () => {
    setload(true)
    const data = await getUserWishlist(page);
    setWishVidoes(data.data || []);
    setPageNo(data?.totalPages || 1)
    setload(false)
  };
  useEffect(() => {
    GET();
  }, []);

  const Delete = async(id)=>{
    setload(true)
    const body = {
      item_id:id
    }
    const data = await DeleteWish(body)
    if(data.success)
    {
    window.location.reload()
    }
    else{
      setload(false)
    }

  }

  const Right =()=>{
    router.push(`/wishlist/${parseInt(page,10) + 1}`)
  }
  const Left =()=>{
    router.push(`/wishlist/${parseInt(page,10) - 1}`)

  }

  if(load)
    return <Loading/>
  return (
    <div className="min-h-[100vh] relative w-full flex justify-center">
      <div
        className=" top-6 sm:top-10 left-5 sm:left-10 text-3xl  sm:text-4xl cursor-pointer absolute"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
      </div>

      <div className=" w-[90%] 2xl:w-2/3 pt-20">
        <div className=" mb-10">
          <TitleBar title={"My Wishlist"} />
        </div>
        <Pagination page={page} noOfPages={pageNo} Right={Right} Left={Left}/>
        <div className=" w-full mt-2  flex  flex-wrap">
          {WishVideos.map((e, i) => {
            return (
              <div key={i} className=" flex flex-col items-center m-2 mb-4 relative z-40 group ">
                <MovieBlock data={e} />
                <div className="h-5 w-full">
                <div onClick={()=>Delete(e.id)} className=" hidden cursor-pointer justify-center rounded-b-md hover:bg-red-800 group-hover:flex w-full py-1 text-center bg-red-600 font-semibold">Remove</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainBody;
