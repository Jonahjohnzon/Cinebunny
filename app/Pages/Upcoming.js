import React, { useEffect, useState } from 'react'
import TitleBar from '../Component/TitleBar'
import axios from 'axios'
import Apicore from '../ApiCore'
import Ads from './Ads'
import YouTube from 'react-youtube'

const Upcoming = ({Trailer}) => {
    const api = new Apicore()
    const number = Trailer.length
    const [id, setId] = useState(Trailer[Math.floor(Math.random() * number)]?.id)
    console.log(id)
    const [url,setUrl] = useState()
    const [tmdb, setTmdb] = useState()
    const getUrl = async() =>{
        setUrl()
        const response = await api.get(`/3/movie/${id}/videos?language=en-US`)
        console.log(response)
        const dataresult = response.results
        const result = dataresult.find(item => item.type === "Trailer");
        setUrl(result?.key)
        setTmdb(result || "Youtube")
       
    }
    useEffect(()=>{
        getUrl()
    },[id])

    const opts = {
      height: '440px',
      width: '100%',
      playerVars: {
        autoplay: 0,
        controls: 0,
        rel: 0,
      },
    };
   
  return (
    <div className=' bg-transparent relative z-40 flex flex-col items-center'>
    <div className='w-[95%] lg:w-[80%] 3xl:w-[70%] mb-5 px-2 '><TitleBar  title={"Today's Trailers"}
    /></div>
   
    <div className=' w-[95%] lg:w-[80%] 3xl:w-[70%] flex items-center justify-center xl:justify-between'>
    <section className=' w-full md:w-[80%] lg:w-[65%] flex items-start '>
    <div className=' xl:mr-5 flex justify-center items-center'>
        {url&&
        <div className='2xl:w-[740px] w-[340px]  xs:w-[460px] sm:w-[580px] md:w-[640px] ' >
        <YouTube videoId={url} title={tmdb.name} opts={opts} />
        </div>}
    </div>
    </section>
    <div className=' xl:inline hidden'><Ads/></div>
    </div>
    </div>
  )
}

export default Upcoming