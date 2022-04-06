import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";

const reducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export type reducerType = ReturnType<typeof reducer>

export const store = createStore(reducer)