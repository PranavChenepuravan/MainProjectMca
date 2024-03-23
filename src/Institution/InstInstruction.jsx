import React,{ useState } from 'react'
import axios from 'axios'


export const InstInstruction = () => {
  const [data,setData]=useState('')
  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  let handleSubmit=async (event)=>{
    event.preventDefault()

    let response=await axios.post('http://localhost:4000/institution/instruction',data)
    console.log(response);
  }
  return (
    <>
    {/* <div className='rectinstr '> */}
    <div className=' h-[50%] w-[50%]  justify-center '>
    
     <div className='text-[150%] text-center'>INSTRUCTIONS</div>
     <textarea type="text" name="instruction" onChange={handleChange} id="first_name" className="h-[75%]  ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required />
     <button type="button" onClick={handleSubmit} className="focus:outline-none ml-[43%] mr-[50%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
    
    </div> 
    </>
  )
}
export default InstInstruction