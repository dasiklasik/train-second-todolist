import {tasksStateType, taskType, todolistId1, todolistId2} from "../App";
import {v1} from "uuid";

export type tasksActionType = removeTodolistTaskACType | removeTaskACType | addTaskACType
    | changeTaskStatusACType | changeTaskTitleACType

const defaultState: tasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: 'milk', isDone: true},
        {id: v1(), title: 'cheese', isDone: true},
        {id: v1(), title: 'apples', isDone: false},
    ],
}

export const tasksReducer = (state = defaultState, action: tasksActionType): tasksStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST-TASK": {
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        case 'REMOVE-TASK': {
            let newState = {...state}
            return {...newState,[action.payload.todolistId]:
                    newState[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            let newState = {...state}
            return {...newState, [action.payload.todolistId]:
                    [...newState[action.payload.todolistId], {id: v1(), title: action.payload.title, isDone: false}]}
        }
        case 'CHANGE-TASK-STATUS': {
            let newState = {...state}
            return {...newState, [action.payload.todolistId]:
                    newState[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.isDone} : t)}
        }
        case 'CHANGE-TASK-TITLE': {
            let newState = {...state}
            return {...newState, [action.payload.todolistId]:
                    newState[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title} : t)}
        }
    }
    return state
}


type removeTodolistTaskACType = ReturnType<typeof removeTodolistTaskAC>

export const removeTodolistTaskAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST-TASK' as const,
        payload: {
            todolistId,
        }
    }
}


type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        payload: {
            todolistId,
            taskId,
        },
    }
}


type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        payload: {
            todolistId,
            title,
        },
    }
}


type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
 return {
     type: 'CHANGE-TASK-STATUS' as const,
     payload: {
         todolistId,
         taskId,
         isDone,
     },
 }
}


type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        payload: {
            todolistId,
            taskId,
            title,
        },
    }
}