import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";


const initialState: Array<TodolistType> = []


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: tsarType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let copyState = [...state]
            return copyState.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST': {
            let copestate = [...state]
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...copestate]
        }
        case "CHANGE-TODOLIST-TITLE": {
            debugger
            let stateCopy = [...state]
           let todolist = stateCopy.find(t => t.id === action.id ? {...t, title:action.title}:t)

            if (todolist){
               todolist.title=action.title
           }
            return stateCopy
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}


type tsarType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistACType | ChangeFilterTodolistACType


export const RemoveTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    } as const
}

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistACType = ReturnType<typeof ChangeNameTodolistAC>
export type ChangeFilterTodolistACType = ReturnType<typeof ChangeFilterTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>

export const AddTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const ChangeNameTodolistAC = (id: string, title: string ) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const ChangeFilterTodolistAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)