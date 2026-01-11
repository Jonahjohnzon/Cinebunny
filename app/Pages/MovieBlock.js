import React from 'react'
import { useRouter } from 'nextjs-toploader/app';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { FaStar } from "react-icons/fa";

const MovieBlock = ({data, passType = ""}) => {

    const Api = process.env.NEXT_PUBLIC_SIZEIMAGE;
    const router = useRouter();
    const type =  data.media_type? data.media_type == "movie" ? 'movie':'tv' : passType
    const addDefaultImg = ev => {
      ev.target.src = "/dfi.png"
   }
  return (
    <LazyLoadComponent effect="blur" className=" w-full"     wrapperProps={{
style: {transitionDelay: "1s"},
}}>
    <div  role="img" aria-label="movie image" title="movie image"  className=' rounded-lg cursor-pointer overflow-hidden w-36 sm:w-48 h-60 sm:h-72 group relative ' onClick={()=>router.push(`/details/${type}/${data.id}/1`) } >
      <img onError={addDefaultImg} className=' w-full h-full object-cover object-center absolute z-10 ' src={`${Api}${data.poster_path}`} loading='lazy' alt={data.name || data.original_name || data.title} />
        <div className=' flex justify-center items-end bg-black w-full h-full absolute z-20 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 ease-in-out'>
          <div className=' px-2  font-bold w-full opacity-0   group-hover:opacity-100 transition-all text-center flex flex-col items-center absolute -bottom-10 group-hover:bottom-10 duration-300 ease-in-out'>
            <p className=' text-lg font-semibold'>{data.name || data.original_name || data.title}</p>
            <div className=' flex items-center w-fit justify-center'><p className=' text-yellow-300 mr-2'><FaStar/></p><p>{Math.ceil(data.vote_average)}/10</p></div>
          </div>
        </div>
    </div> 
    </LazyLoadComponent>
  )
}

export default MovieBlock