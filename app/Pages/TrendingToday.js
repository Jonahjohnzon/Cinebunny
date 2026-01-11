import React from 'react'
import MovieBlock from './MovieBlock'
import TitleBar from '../Component/TitleBar'

const TrendingToday = ({BackgroundList, Title, type}) => {
  return (
    <div className=' bg-transparent relative z-40 flex flex-col items-center'>
      <div className=' w-[95%] 2xl:w-5/6 mb-5 px-2 '><TitleBar  title={Title}
      /></div>
     
      <section className=' w-[95%] 2xl:w-5/6 overflow-x-scroll scrollbar-none'>
        <div className=' flex items-center '>
          {
            BackgroundList.map((data)=>{
              return(
                <div key={data.id} className=' m-2 '>
                  <MovieBlock data={data} passType={type}/>
                </div>
              )
            })
          }
        </div>
      </section>
   

    </div>
  )
}

export default TrendingToday