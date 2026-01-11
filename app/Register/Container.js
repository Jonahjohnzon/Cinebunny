"use client"
import React from 'react'
import { state } from '../store'
import { useSnapshot } from 'valtio'
import SignUp from './SignUp'
import Login from './Login'


const Container = () => {
const show = useSnapshot(state).signUp
const switchReg = useSnapshot(state).login
  return (
    <div className=' fixed top-0 z-50 left-0 flex justify-center items-center w-[100vw] h-[100vh]'>
        <div className=' bg-black bg-opacity-50 absolute z-10 top-0 w-full h-full'  onClick={()=>{
            state.signUp = false
        }}></div>
         <main className=' w-[90%] sm:w-fit  py-8 rounded-sm bg-gray-900 absolute z-20'>
        <div className=' flex flex-col items-center justify-center h-[100%]  w-full'>
        <div className=' flex items-center mb-5 justify-between w-2/3'>
        <header className={` text-center w-full text-white font-semibold  text-xl cursor-pointer pb-2 ${switchReg &&'border-b-4'} border-b-red-600 `}  onClick={()=>{
            state.login = true
        }} >Sign up</header>
        <header className={` text-center w-full text-white font-semibold text-xl cursor-pointer pb-2 ${switchReg||'border-b-4'} border-b-red-600`}  onClick={()=>{
            state.login = false
        }} >Log in</header>
        </div>
        {show&&
        <div className=' w-full'>
        {switchReg?<div className='w-[100%] sm:w-[430px] md:w-[500px]'>
            <SignUp />
        </div>:
        <div className=' w-[100%] sm:w-[430px] md:w-[500px]'>
            <Login/>
        </div>}
        </div>}
    </div>
</main>
    </div>
  )
}

export default Container