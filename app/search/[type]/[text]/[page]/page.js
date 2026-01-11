import React from 'react'
import Layout from './Layout'

const page = async ({params}) => {
  const param = await params
  const page = param.page
  const text = param.text
  const type = param.type
  return (
    <Layout type={type} page={page} texts={text}/>
  )
}

export default page