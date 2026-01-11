import React from 'react'

const TitleBar = ({title}) => {
  return (
    <div className=' font-bold text-2xl md:text-3xl flex items-center'>
      <div className=' bg-red-600 md:h-10 md:w-3 w-2 h-8  rounded-xl mr-2'></div>
      <h1>{title}</h1></div>
  )
}

export default TitleBar