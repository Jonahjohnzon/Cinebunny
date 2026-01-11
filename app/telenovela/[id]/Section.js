import React from 'react'
import List from './List'


const Section = ({id, Detail}) => {
  return (
    <div className=' flex justify-center w-full pb-20'>
        <div className=' w-[95%] sm:w-[90%] xl:w-2/3'>
            <div>
                <List list={Detail?.episodes} Detail={Detail} id={id}/>
            </div>
        </div>
    </div>
  )
}

export default Section