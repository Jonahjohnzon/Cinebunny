import React from 'react'
import { FaPlus } from "react-icons/fa6";


const WishlistButton = () => {
  return (
    <div className='whitespace-nowrap flex items-center px-7 py-3 font-semibold border-white border-[1px] rounded-3xl'><span className=' mr-2 '><FaPlus className=' scale-150'/></span><div className=' text-lg'>Add to wishlist</div></div>
  )
}

export default WishlistButton