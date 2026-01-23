import {useState} from 'react'
import TranslatorApp from './components/TranslatorApp'
import TranslatorStart from './components/TranslatorStart'

function App() {
      const [showTranslatorApp, setShowTranslatorApp]=useState(false)

      const handleToggle=()=>{
        setShowTranslatorApp(!showTranslatorApp)
      }
  return (
     <div className='rounded-xl w-[90%] max-w-xl sm:h-auto shadow-xl shadow-gray-800 flex flex-col bg-[#2d2d2d] '>
      {showTranslatorApp ? <TranslatorApp onClose={handleToggle}/> :  <TranslatorStart onStart={handleToggle} />}
    </div>
  )
}

export default App




