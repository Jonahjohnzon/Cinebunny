import React from 'react'
import List from './Component/List'
import Navbar from '@/app/Navbar'

const page = async ({params}) => {
    const paramsdata = await params
  return (
    <>
    <Navbar active/>
    <List params={paramsdata}/>
    </>
  )
}

export default page