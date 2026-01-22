import React, {useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useDispatch} from 'react-redux'
import {addTodo} from '../features/todo/todoSlice' 

function AddTodo() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()           //dispatch=  reducer ko use krte huye stor em changes krta h .... data dispatch krta h


    const addTodoHandler = (e) => {
        e.preventDefault()
        if(!input){
          console.log("enetr first")
          // toast.success("✅ Correct! Score +1");
          toast.error("❌ Empty Todo");
          return
          // toast.info("ℹ️ Just some info");

        }
        dispatch(addTodo(input))               //dispatch=  reducer ko use krte huye 
        setInput('')
    }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-22  text-center">
       <ToastContainer position="top-center" />
      <h1  className='text-center text-2xl'>Use Todo list</h1>
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo