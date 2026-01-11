import React from 'react'
import { useSnapshot } from 'valtio'
import { state } from './store'
const Message = () => {
    const point = useSnapshot(state)
    const message = point.publicMgs
    const alert = point.alert
  return (
    <>
    {alert&&<div className=' text-lg font-semibold text-center w-[100vw] fixed top-0 z-40 bg-slate-900 text-white flex justify-center py-3 '>
        <p>{message}</p>
    </div>}</>
  )
}

export default Message