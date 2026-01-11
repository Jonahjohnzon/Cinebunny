import React from 'react'
import TitleBar from '@/app/Component/TitleBar'
import YouTube from 'react-youtube'

const TrailerBox = ({url}) => {
  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };
  return (
    <div className=' flex justify-center'>
        <section className=' w-[95%]  sm:w-[445px] md:w-[645px] lg:w-[745px] '>
        <TitleBar title={"Trailer Box"}/>
          <section className=' min-h-96 w-full mt-5 flex justify-center'>
          
        <div className=' border-white border-[1px] h-[402px] w-[95%]  md:w-[70%] lg:w-[745px]  '>
        {url&&<YouTube videoId={url}   opts={opts} onReady={onReady}/>}
        </div>
          </section>
        </section>
    </div>
  )
}

export default TrailerBox