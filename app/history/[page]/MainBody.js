"use client"
import { getUserHistory } from '@/app/history'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'nextjs-toploader/app';
import { IoArrowBack } from "react-icons/io5";
import TitleBar from '@/app/Component/TitleBar';
import RecentBlock from '@/app/Pages/RecentBlock';
import Loading from '../../Loading';
import Pagination from '@/app/[type]/[genre]/[country]/[date]/[sort]/[page]/Component/Pagination';


const MainBody = ({page}) => {
const router = useRouter()
const [HistoryVideos, setHistoryVidoes] = useState([])
const [load, setload] = useState(true)
const [pageNo, setPageNo] = useState(1)

  const GET = async ()=>{
    setload(true)
    const data = await getUserHistory(page)
    setHistoryVidoes(data.data || [])
    setPageNo(data?.totalPages || 1)
    setload(false)
  }
    useEffect(()=>{
      GET()
    },[])

    const Right =()=>{
      router.push(`/history/${parseInt(page,10) + 1}`)
    }
    const Left =()=>{
      router.push(`/history/${parseInt(page,10) - 1}`)
  
    }

    if(load)
      return <Loading/>
  return (
    <div className='min-h-[100vh] relative w-full flex justify-center'>
       <div className=' top-6 sm:top-10 left-5 sm:left-10 text-3xl  sm:text-4xl cursor-pointer absolute' onClick={()=>{
                router.push('/')
              }}><IoArrowBack /></div>

          <div className=' w-[90%] 2xl:w-2/3 pt-20'>
              <div className=' mb-10'><TitleBar title={"My History"}/></div>
              <Pagination  page={page} noOfPages={pageNo} Right={Right} Left={Left}/>
              <div className=' w-full mt-2  flex justify-center  flex-wrap'>
              {HistoryVideos.map((e,i)=>{
                return(
                <div key={i} className=' m-2 relative z-40 '>
                  <RecentBlock data={e}/>
                </div>)
              })}
          </div></div>
    </div>
  )
}

export default MainBody