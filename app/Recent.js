import React, { useEffect, useState } from 'react'
import RecentWatch from './Pages/RecentWatch'

const Recent = () => {
    const [recent, setRecent] = useState([])
    const getData =()=>{
        const data = JSON.parse(localStorage.getItem('recentlyWatched') || null)
        if(data)
        {
        setRecent(data)
        }
    }
useEffect(()=>{
    getData()
},[])
  return (
    <>
        {
        (recent.length != 0 &&<div className=' min-h-80 sm:min-h-96 mb-10 sm:mb-14'>
            <RecentWatch BackgroundList={recent} Title={"Recently Watched"}/>
        </div>)}
    </>
  )
}

export default Recent