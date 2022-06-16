import { createSlice } from "@reduxjs/toolkit"
import StorageService from "../storage/StorageService"

export interface todo {
    id: string
    text: string
    completed: boolean
}

export interface todos {
    done: todo[],
    undone: todo[]
}

const initialState:todos = {
    done: [],
    undone: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action){
            state.undone.unshift(action.payload)
            StorageService.saveTodos(JSON.stringify(state))
        },
        removeTodo(state, action){
            const { id, completed } = action.payload
            const todoList = completed ? state.done : state.undone
            const index = todoList.findIndex(todo => todo.id === id)
            if (index !== -1) todoList.splice(index, 1)
            StorageService.saveTodos(JSON.stringify(state))
        },
        toggleTodo(state, action){            
            const { id, completed } = action.payload
            const todoList = completed ? state.done : state.undone
            const index = todoList.findIndex(todo => todo.id === id)
            if(index !== -1){
                const todo = todoList[index]
                todo.completed = !todo.completed
                const newTodoList = todo.completed ? state.done : state.undone
                todoList.splice(index, 1)
                newTodoList.unshift(todo)
            }
            StorageService.saveTodos(JSON.stringify(state))
        },
        updateTodo(state, action){
            const { todo: {id, completed}, newText } = action.payload
            const todoList = completed ? state.done : state.undone
            const index = todoList.findIndex(todo => todo.id === id)
            if(index !== -1){
                const todo = todoList[index]
                todo.text = newText
            }
            StorageService.saveTodos(JSON.stringify(state))
        },
        restoreTodos(_, action){
            const todos = JSON.parse(action.payload)
            return todos
        }
    }
})

export const { addTodo, removeTodo, toggleTodo, updateTodo, restoreTodos } = todoSlice.actions;
export default todoSlice.reducer;
