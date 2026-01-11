import React, { useEffect, useState } from 'react'
import Apicore from '@/app/ApiCore'
import List from './List'
import { useRouter } from 'nextjs-toploader/app';
import { FaAngleDown } from "react-icons/fa";


const Section = ({season, id, part,Detail}) => {
      const router = useRouter()
    const api = new Apicore()
    const [list, Setlist] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const GetSeason = async()=>{
        try{
            const response = await api.get(`https://api.themoviedb.org/3/tv/${id}/season/${part}?language=en-US`)
            Setlist(response?.episodes)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(()=>{
        GetSeason()
    },[])
  return (
    <div className=' flex justify-center w-full pb-20'>
        <div className=' w-[95%] sm:w-[90%] xl:w-2/3'>
            <div>
    <div className=" z-40 relative w-[80%] sm:w-36">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:text-lg  flex items-center  border-[2px] bg-transparent font-semibold border-white border-opacity-50 p-4 rounded-md text-left"
      >
       <p className=' mr-4'>{`Season ${part}`}</p>
       <span><FaAngleDown/></span> 
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-black border border-opacity-50 rounded-md max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 w-full z-10">
          {season.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setIsOpen(false);
                router.push(`/details/tv/${id}/${i + 1}`);
              }}
              className="cursor-pointer hover:bg-slate-600 p-3 font-semibold"
            >
              {`Season ${i + 1}`}
            </div>
          ))}
        </div>
      )}
    </div>
            </div>
            <div>
                <List list={list} id={id} Detail={Detail}/>
            </div>
        </div>
    </div>
  )
}

export default Section