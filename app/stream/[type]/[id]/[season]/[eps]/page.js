import React from 'react'
import Stream from './Stream'

const page = async ({params}) => {
   const param = await params
    const id =  param?.id
    const type = param?.type
    const season = param?.season
    const eps = param?.eps
    const list = param?.list
  return (
    <Stream id={id} type={type} season={season} eps={eps} list={list}/>
  )
}

export default page