import {filterValuesType, todolistType} from "../App";

export type todolistsActionType = changeTodolistFilterACType | removeTodolistACType
    | addTodolistACType | changeTodolistTitleACType


export const todolistsReducer = (state: Array<todolistType>, action: todolistsActionType): Array<todolistType> => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER": {
            let newState = [...state]
            return newState.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.filter} : tl)
        }
        case 'REMOVE-TODOLIST': {
            let newState = [...state]
            return newState.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newState = [...state]
            return [...newState, {id: '3', title: action.payload.title, filter:'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let newState = [...state]
            return newState.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title} : tl)
        }
    }
    return state
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId: string, filter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        payload: {
            todolistId,
            filter,
        }

    }
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST' as const,
        payload: {
            todolistId,
        }
    }
}

type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        payload: {
            title,
        }
    }
}


type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        payload: {
            todolistId,
            title,
        }
    }
}