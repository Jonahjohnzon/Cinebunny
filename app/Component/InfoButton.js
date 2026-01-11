import React from 'react'
import { RiInformation2Line } from "react-icons/ri";


const InfoButton = ({url}) => {
   return (
     <div className=' whitespace-nowrap flex items-center px-10 py-3 font-bold rounded-sm text-white border-white border-[1px]'>
        <div className=' mr-3'><RiInformation2Line/></div> <p>More Information</p></div>
   )
}

export default InfoButton