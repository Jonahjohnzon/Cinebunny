import React from 'react'
import { useRouter } from 'nextjs-toploader/app';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { FaStar } from "react-icons/fa";

const Block = ({data}) => {
    const router = useRouter();
    const addDefaultImg = ev => {
      ev.target.src = "/dfi.png"
   }
  return (
    <LazyLoadComponent effect="blur" className=" w-full"     wrapperProps={{
style: {transitionDelay: "1s"},
}}>
    <div  role="img" aria-label="movie image" title="movie image"  className=' rounded-lg cursor-pointer overflow-hidden w-36 sm:w-48 h-60 sm:h-72 group relative ' onClick={()=>router.push(`/telenovela/${data._id}`) } >
      <img onError={addDefaultImg} className=' w-full h-full object-cover object-center absolute z-10 ' src={data.Image} loading='lazy' alt={data.title} />
        <div className=' flex justify-center items-end bg-black w-full h-full absolute z-20 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 ease-in-out'>
          <div className=' px-2  font-bold w-full opacity-0   group-hover:opacity-100 transition-all text-center flex flex-col items-center absolute -bottom-10 group-hover:bottom-10 duration-300 ease-in-out'>
            <p className=' text-lg font-semibold'>{data.title}</p>
            <div className=' flex items-center w-fit justify-center'><p className=' text-yellow-300 mr-2'><FaStar/></p><p>{data.rating}</p></div>
          </div>
        </div>
    </div> 
    </LazyLoadComponent>
  )
}

export default Block