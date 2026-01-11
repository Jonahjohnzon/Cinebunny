import React from 'react'
import EpisodeBlock from './EpisodeBlock'

const List = ({list, id, Detail}) => {
  return (
    <div className=' overflow-hidden'>
        <div className=' max-h-[520px] scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-400  overflow-y-scroll'>{
            list.map((e,i)=>{
              let airDate =e?.air_date ? new Date(e.air_date) : null;
              let currentDate = new Date()
                return(<div key={i}>
                  {(airDate < currentDate && airDate ) &&<div  className='my-2 h-24'>
                    <EpisodeBlock data={e} id={id} Detail={Detail}/>
                </div>}</div>)
            })}</div>
    </div>
  )
}

export default List