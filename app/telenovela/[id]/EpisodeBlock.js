import React from 'react'
import { CiPlay1 } from "react-icons/ci";
import { useRouter } from 'nextjs-toploader/app';
import { History } from '@/app/history';
import { saveToRecentlyWatched } from '@/app/history';


const EpisodeBlock = ({data, Detail}) => {
        const router = useRouter()
        const historyBody = {
        id:Detail?._id,
        media_type:"telenovela",
        poster_path:Detail?.Image,
        name:Detail?.title,
        original_name:Detail?.title,
        title:Detail?.title,
        vote_average:Detail?.rating,
        season:Detail?.seasons,
        episode:data?.episodeNumber,
        url:data.url
      }

  return (
    <>
   <div className=' w-full h-full bg-slate-900 hover:scale-95 cursor-pointer transition-all duration-500 ease-in-out' onClick={()=>{
        History(historyBody)
        saveToRecentlyWatched(historyBody)
      window.open("https://poawooptugroo.com/4/8808782")
      router.push(`/telestream?link=${data?.url}`)
    }}>
        <section className=' flex items-center h-full w-full rounded-md overflow-hidden'>
            <div className=' w-40 rounded-md relative h-full  ' >
                <div className=' w-full h-full relative z-20 flex justify-center items-center'>
                  <div className=' mr-5 w-10 h-10 flex items-center justify-center rounded-full bg-opacity-60 bg-black'>
                    <CiPlay1 className=' text-opacity-100 text-white'/>
                    </div> 
                  <div>
                    <div className=' flex items-center'><p className=' mr-2'>Episode</p><p>{data?.episodeNumber}</p></div>
                  </div>
                </div>
            </div>
        </section>
    </div></>
  )
}

export default EpisodeBlock