import React from 'react'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";


const Pagination = ({page, noOfPages, Right, Left}) => {
  return (
    <div className=' text-sm sm:text-base w-full border-y-white border-y-[1px] border-opacity-50 py-2'>
        <div className=' w-full justify-between flex flex-col sm:flex-row items-center'>
            <div className=' mb-5 sm:mb-0'>{`Total Pages: `} <span className=' text-green-500 font-bold'>{noOfPages}</span></div>
            <section className=' flex items-center'>
          {/* Previous Button */}
          <button
            className='flex mr-5 items-center px-3 py-1 bg-gray-800 rounded hover:bg-gray-900 disabled:opacity-50'
            onClick={() => {Left()}}
            disabled={page <= 1}
          >
            <FaCaretLeft className='mr-2' /> Previous
          </button>
          {/* Current Page */}
          <span className=' font-semibold'>
            Page <span className='text-green-500'>{page}</span> of <span className='text-green-500'>{noOfPages}</span>
          </span>
          {/* Next Button */}
          <button
            className='flex ml-5 items-center px-3 py-1 bg-gray-800 rounded hover:bg-gray-900 disabled:opacity-50'
            onClick={() =>{Right()}}
            disabled={page >= noOfPages}
          >
            Next <FaCaretRight className='ml-2' />
          </button>
            </section>
        </div>
    </div>
  )
}

export default Pagination