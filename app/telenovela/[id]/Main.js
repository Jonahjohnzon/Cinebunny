"use client"
import WishlistButton from '@/app/Component/WishlistButton';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'nextjs-toploader/app';
import Footer from '@/app/Footer';
import Section from './Section';
import Loading from '@/app/Loading';
import { IoArrowBack } from "react-icons/io5";
import { getWishlistId, History, saveToRecentlyWatched, WishList } from '@/app/history';
import Button from '@/app/Component/Button';
import { useSnapshot } from 'valtio';
import { state } from '@/app/store';
import ReactGA from 'react-ga4'

const Body =  ({id}) => {
  const load = useSnapshot(state).wishload
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [wishshow, setwishshow] = useState(false)
  const [wishlistArray, setWishlistArray] = useState([])
  const [Detail, setDetail] = useState({})

  const GetDetails = async () =>{
    setLoading(true)
    let response;
    try{
     const res= await fetch(`/api/getseries?id=${id}`)
      response = await res.json()
      if(response.success)
      {
        setDetail(response.series)
        console.log(response.series)
      }
  
    const wishlistId = await getWishlistId()
    setWishlistArray(wishlistId || [])
  }
  catch(error)
  {
    console.log(error)
  }finally{
    setLoading(false)
  }
  }
  useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: "/detail", title: "Body Page" });
    GetDetails()
  },[])


  if(loading)
    return <div><Loading/></div>
  const historyBody = {
        id:Detail?._id,
        media_type:"telenovela",
        poster_path:Detail?.Image,
        name:Detail?.title,
        original_name:Detail?.title,
        title:Detail?.title,
        vote_average:Detail?.rating,
        season:Detail?.seasons,
        episode:'1',
        url:Detail?.episodes[0]?.url
  }
  const PUSH = async()=>{
    const info = await WishList(historyBody)
    if(info)
    {
    setwishshow(true)
    }
    else{
      setwishshow(false)
    }
  }

  const addDefaultImg = ev => {
    ev.target.src = "/dfi.png"
 }
  return (
    <section className=' relative min-h-[100vh] flex flex-col items-center '>
      <div      
      className="relative top-0 left-0 w-[100vw] h-full   bg-cover bg-center"
          style={{
            backgroundImage: `url(${Detail.coverImage})`,
          }}>

      
      <div className=" py-20 md:py-40  w-full flex justify-center items-center h-full top-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)]  to-[rgba(0,0,0,1)]">
        <div className=' top-7 z-50 left-7 text-4xl cursor-pointer absolute' onClick={()=>{
          router.push('/')
        }}><IoArrowBack /></div>
        <section className='  w-[95%] md:w-[90%] 2xl:w-[60%] flex md:flex-row flex-col items-center justify-between'>
          <div className=' mb-5 md:mb-0 w-full min-h-72 lg:w-[40%] flex justify-center md:justify-start lg:justify-center'>
            <img onError={addDefaultImg} src={Detail?.Image} className=' w-40 md:w-60 lg:w-72 shadow-sm shadow-black rounded-md'/>
          </div>
          <div className=' w-[100%] sm:w-[60%] flex flex-col items-center'>
            <h1 className=' text-3xl sm:text-5xl font-bold mb-1 text-center'>{ Detail?.title }</h1>
            
            <div className=' flex flex-wrap w-full justify-center items-center mb-5'>
              {Detail?.genre?.map((data,e)=>{
                return <p key={e} className=' font-semibold mr-3 px-2 whitespace-nowrap bg-red-900 py-1 mb-1 rounded-sm'>{data}</p>
              })}
            </div>
            <div className='text-center mb-10 font-medium  px-3 text-lg h-20 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-400'>
              <p>{Detail.description}</p>
            </div>
           {Detail?.status != "coming soon"? <div className=' flex sm:flex-row flex-col justify-center items-center cursor-pointer'>
            <div onClick={()=>{
                History(historyBody)
                saveToRecentlyWatched(historyBody)
                window.open("https://poawooptugroo.com/4/8808782")
                router.push(Detail?.episodes[0]?.url)
              }}><Button title={"Stream/Download"}/></div>
              
              <>
              {Detail?.status == "ongoing"?
              <div className=' w-40 rotate-[16deg] sm:ml-5 '><img src='/progress.png'/></div>:<div className=' w-40 rotate-12 '><img src='/completed.png'/></div>}</> 


            </div>:<div className=' w-40 '><img src='/nota.png'/></div>}
          </div>
        </section>
      </div>
      </div>
      <div className=' flex justify-start  w-[100%] sm:w-[90%] xl:w-2/3'>
       {Detail?.status != "coming soon" &&<Section Detail={Detail} id={id} />}
      </div>
      <div className=' mt-10 w-full'>
        <Footer/>
      </div>
    </section>
  )
}

export default Body
