import React from 'react'
import EpisodeBlock from './EpisodeBlock'

const List = ({list, id, Detail}) => {
  return (
    <div className=' overflow-hidden'>
        <div className=' max-h-[520px] scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-400  overflow-y-scroll'>{
            list?.map((e,i)=>{
                return(<div key={i}>
                  {<div  className='my-3 h-14'>
                    <EpisodeBlock data={e} id={id} Detail={Detail}/>
                </div>}</div>)
            })}</div>
    </div>
  )
}

export default List