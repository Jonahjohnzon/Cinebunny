import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { state } from '../store'

const Login = () => {
 const [show, setshow] = useState(false)
        const [result, setresult] = useState()
        const [load, setload] = useState(false)
        const [color, setcolor] = useState('')
        const Schema=yup.object({
          email:yup.string().email().required().label('Email'),
          password:yup.string().min(1).max(15).required().label('Password'),
        })
  return (
    <div className=' w-full px-6 '>
            <Formik
            validationSchema={Schema}
            initialValues={{email:"", password:""}}
            onSubmit={async(form,{resetForm})=>{
                   setload(true)
                   try{ const data = await fetch('/api/login',{
                        method:'POST',
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify(form)
                    })
                    const info =  await data.json()
                      if(info.success)
                      {
                        setcolor(' text-green-600')
                        setresult(info.message)
                        setshow(true)
                        setload(false)
                        state.log = true
                        state.signUp = false
                        resetForm()
          
                      }
                      else
                      {
                        setcolor(' text-red-600')
                        setresult(info.message)
                        setshow(true)
                        setload(false)
                      }
                }
                    catch(e)
                    {   
                        setload(false)
                    } 

            }}
            >
                {
                    (prop)=>{
                            return(
                                <div>
                                    <div className=' flex justify-center w-full h-8'>{show&&<p className={`${color} font-semibold`}>{result}</p>}</div>
                                    <div className=' mb-5 text-white'>
                                        <label htmlFor='email' className='  text-sm font-semibold'>EMAIL:</label>
                                        <input id="email" type='email' className=' text-white  placeholder:text-white px-4 w-full h-12 mt-2 border-[1px] bg-gray-900 border-gray-200' value={prop.values.email} onChange={prop.handleChange('email')}/>
                                        <div className=' text-red-500 text-sm'>{prop.touched.email && prop.errors.email}</div>
                                    </div>
                                    <div className=' mb-5 '>
                                        <label htmlFor='password' className=' text-sm font-semibold'>PASSWORD:</label>
                                        <input id="password" type='password' className='text-white  placeholder:text-white px-4 w-full h-12 mt-2 border-[1px] bg-gray-900 border-gray-200' placeholder='*****'  value={prop.values.password} onChange={prop.handleChange('password')}/>
                                        <div className=' text-red-500 text-sm'>{prop.touched.password &&prop.errors.password}</div>
                                    </div>
                                    <div>
                                        {load?<div className=' flex justify-center'>
                                              <div className=' w-7 h-7 rounded-full border-t-2 border-t-[#03091A] border-yellow-600 border-x-4 border-b-4 animate-spin flex justify-center items-center'>
                                              <div className=' w-3 h-3 rounded-full border-b-2 border-b-[#03091A] transform -scale-y-180 border-red-600 border-x-4 border-t-4 animate-spin'></div>
                                            </div>
                                        </div>:<input type='submit' className='bg-red-500 w-full py-3 font-semibold  text-white  cursor-pointer' value={"LOG IN"} onClick={prop.handleSubmit}/>}
                                    </div>
                                </div>
                            )
                    }
                }
            </Formik>
        </div>
  )
}

export default Login