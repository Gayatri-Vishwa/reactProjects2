import { createSlice,nanoid } from "@reduxjs/toolkit";  //nanoid generates unique id
//initial state of store is an Object     /starting m ksa dikhrga store
//it can be array or obj here obj
const initialState={
    todos:[{id:1, text:"hello world"}]           //intial state can be array or object

}
//in context Api we dont define here only declare here
//but in redux we define also here
//it should has same prperties always=  _name ,initialstate, reducers_state can update
 //state means jo current state h  action means jo b data pass hora h  
//slice has name this is to be used when we use redux-toolkit
export const todoSlice=createSlice({
    name:"todo",
    initialState,    //can declare here but we define it upperside
             
    reducers:{                         //can define upper or here
        addTodo:(state,action)=>{       //it has two arguments state =that state changing state after initial state ,action  gives values for our use like  for remove id chahiye so action
            const todo={ 
            id:nanoid(),
            text: action.payload           //for text we use action payload is an  object we can find value like action.payload.text------    or string "hello world"
            }
            state.todos.push(todo)
        }, 

        removeTodo:(state,action)=>{               //state means jo current state h  action means jo b data pass hora h   //reducers has properties and functins
            state.todos=state.todos.filter((todo)=>
            todo.id !=action.payload)
        

        },          


    }             
})
//now we have to export functionality addtodo removetodo  // reducers are add remove update delete etc
 export const {addTodo,removeTodo}=todoSlice.actions  //individual reducer ko  export  this is used in components
 export default todoSlice.reducer       //it is mendatory default reducer ko  export