//store-- values lekr update krta h
import {configureStore} from '@reduxjs/toolkit'         //
import todoReducer  from '../features/todo/todoSlice'

export const store= configureStore({             //it takes object
    reducer:todoReducer           //key value of reducer can give list of reducers
})   