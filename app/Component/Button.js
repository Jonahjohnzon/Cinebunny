import React from 'react'
import { FaPlay } from "react-icons/fa";


const Button = ({title, scal}) => {
  return (
    <div className={` whitespace-nowrap bg-white font-bold ${scal&&'scale-[120%]'} hover:scale-[110%] transition-all duration-300 ease-in-out flex items-center px-10 py-3 rounded-sm text-black`}>
       <div className=' mr-3'><FaPlay/></div> <p>{title}</p></div>
  )
}

export default Button