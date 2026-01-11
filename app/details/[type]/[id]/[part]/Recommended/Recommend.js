import TitleBar from '@/app/Component/TitleBar'
import React from 'react'
import Box from './Box'

const Recommend = ({data}) => {
  return (
    <div className=' mt-10 w-full flex justify-center'>
        <section className=' w-[90%]'>
            {data.length !== 0 &&<div className=' mb-5'><TitleBar title={"Similar Movies"}/></div>}
            <div className='w-full overflow-x-scroll scrollbar-none'>
            <div className=' flex items-center'>
                {data.map((detail)=>{
                    return(
                        <div key={detail.id} className=' mr-5'>
                            <Box e={detail}/>
                        </div>
                    )
                })}
            </div>
            </div>
        </section>
    </div>
  )
}

export default Recommend