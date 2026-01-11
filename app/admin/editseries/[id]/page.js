
import React from 'react'
import Main from './Main'

const page = async({params}) => {
  const param = await params
  const id = param.id
  return (
    <><Main id={id}/></>
  )
}

export default page


