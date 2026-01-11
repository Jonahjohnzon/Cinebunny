"use client"
import React, { useEffect, useState } from 'react'
import InputBox from './Component/InputBox'
import Apicore from '@/app/ApiCore'
import MovieBlock from '@/app/Pages/MovieBlock'
import Footer from '@/app/Footer'
import Pagination from './Component/Pagination'
import { useRouter } from 'nextjs-toploader/app';


const Category = ({params}) => {
  const router =  useRouter()
  const api = new Apicore()
  const date = params.date
  const type = params.type
  const country = params.country
  const page = params.page
  const sorts = params.sort
  const genre = params.genre
  const [pages, setPages] = useState(0)
  const [data, setData] = useState([])
  const getData = async()=>{
    let sort;
    if(params.sort == 1)
    {
      sort = 'popularity.desc'
    }
    else if(params.sort == 2 )
    {
      sort = 'vote_count.desc'
    }
    else{
      sort = 'primary_release_date.asc'
    }

    const response = await api.get(`/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}&${type == 'movie' ?'primary_release_date.gte':'first_air_date.gte'}=${date}-01-01&${type == 'movie' ?'primary_release_date.lte':'first_air_date.lte'}=${date}-12-31&with_genres=${genre}${genre != '16'&&`&with_origin_country=${country}`}&${(genre == '16' && type == 'tv')&&'with_origin_country=JP'}`)
    setData(response.results)
    setPages(response.total_pages)
  }

  const Right =()=>{
    router.push(`/${type}/${genre}/${country}/${date}/${sorts}/${parseInt(page,10) + 1}`)
  }

  const Left = () =>{
    router.push(`/${type}/${genre}/${country}/${date}/${sorts}/${parseInt(page,10) - 1}`)
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <div className=' w-[100vw] pt-24 sm:pt-32  font-semibold relative z-20 min-h-[100vh] flex flex-col items-center justify-center'>
      <div className=' w-[90%] 2xl:w-2/3 mb-10'>
        <div className=' mb-5'><InputBox params={params}/></div>
        <Pagination page={page} noOfPages={pages} Right={Right} Left={Left}/>
        <div className=' mt-5 flex flex-wrap justify-center min-h-[100vh]'>
        {data.map((e,i)=>{
          return(
            <div key={i} className=' mr-4 mb-4'>
              <MovieBlock data={e} passType={type}/>
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

export default Category