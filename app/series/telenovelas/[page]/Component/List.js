"use client"
import React, { useEffect, useState } from 'react'
import Block from './Block'
import Footer from '@/app/Footer'
import Pagination from './Pagination'
import { useRouter } from 'nextjs-toploader/app';


const List = ({params}) => {
const router =  useRouter()
const page = params.page
const [pages, setPages] = useState(0)
const [data, setData] = useState([])


const getData = async()=>{
  const res = await fetch(`/api/listseries?page${page}`)
   const response = await res.json();
    setData(response.series)
    setPages(response.totalPages)
}

const Right =()=>{
    router.push(`/series/telenovelas/${parseInt(page,10) + 1}`)
}

const Left = () =>{
    router.push(`/series/telenovelas/${parseInt(page,10) - 1}`)

}

  useEffect(()=>{
    getData()
  },[])
  return (
    <div className=' w-[100vw] pt-24 sm:pt-32  font-semibold relative z-20 min-h-[100vh] flex flex-col items-center justify-center'>
      <div className=' w-[90%] 2xl:w-2/3 mb-10'>
        <Pagination page={page} noOfPages={pages} Right={Right} Left={Left}/>
        <div className=' mt-5 flex flex-wrap justify-center min-h-[100vh]'>
        {data.map((e,i)=>{
          return(
            <div key={i} className=' mr-4 mb-4'>
              <Block data={e}/>
            </div>
          )
        })}
      </div>
      <Pagination page={page} noOfPages={pages} Right={Right} Left={Left}/>
      </div>
      <Footer/>
    </div>
  )
}

export default List