import React from 'react'
import MainBody from './MainBody'

const page = async({params}) => {
  const param = await params
  const page = param.page
  return (
    <><MainBody page={page}/></>
  )
}

export default page