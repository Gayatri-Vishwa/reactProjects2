import  { useState } from 'react'

function TranslatorStart({onStart}) {

  return (
   <div className='p-5  flex flex-col justify-center '> 

<div className='w-full h-64 flex  flex-col  bg-gradient-to-r from-[#b6f492] to-[#338b93] rounded-t-full rounded-bl-full  p-6 sm:p-12 text-gray-800'>
 <span className='font-shojumaru text-5xl text-center'>Hello</span>
 <span className='text-2xl text-center'>नमस्ते</span>
 <span className='font-notojp text-3xl text-right sm:text-4xl'>你好</span>
 <span className='text-2xl xm:text-3xl text-right'>Hola</span>
</div>


<div className='flex flex-col space-y-5 mt-20 mb-36 justify-end items-end  flex-col'>
    <span className='font-righteous text-4xl text-white uppercase'>Translator App</span>
    <button onClick={onStart} className='font-righteous  uppercase w-32 h-10 rounded-full p-1 bg-gradient-to-r from-[#b6f492] to-[#338b93] ' >START</button>
  
</div>
   </div>
  )
}






export default TranslatorStart
