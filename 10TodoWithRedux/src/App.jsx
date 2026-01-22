
import AddTodo from './components/AddTodo'

import Todos from './components/Todos'

function App() {


  return (
    <>
  <div className='bg-gray-600  min-h-screen flex flex-col '>
     <AddTodo/>
  <Todos />
  </div>
 
    </>
  )
}

export default App
