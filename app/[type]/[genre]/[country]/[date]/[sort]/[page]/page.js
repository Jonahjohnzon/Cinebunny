import React from 'react'
import Category from './Category'
import Navbar from '@/app/Navbar'

const page = async ({params}) => {
    const paramsdata = await params
  return (
    <>
    <Navbar active/>
    <Category params={paramsdata}/>
    </>
  )
}

export default page