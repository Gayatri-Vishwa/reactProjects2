import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("❌ Empty Todo");
      return;
    }
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-0 mt-8">
      <ToastContainer position="top-center" />
      
      {/* Heading */}
      <h1 className="text-center  text-white text-2xl mb-4">Use Todo List</h1>

      {/* Form: input + button */}
      <form 
        onSubmit={addTodoHandler} 
        className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
      >
        <input
          type="text"
          className="flex-1 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 w-full transition-colors duration-200 ease-in-out"
          placeholder="Enter a Todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="w-full sm:w-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
