import {todolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

export let state: Array<todolistType>

beforeEach(() => {
    return state = [
        {id: '1', title: "What to learn", filter: "all"},
        {id: '2', title: "What to buy", filter: "all"},
    ]
})

test('todolists reducer should change filter', () => {
    const endState = todolistsReducer(state, changeTodolistFilterAC('1', 'completed'))

    expect(endState[0].filter).toBe('completed')
})

test('todolists reducer should remove todolist', () => {
    const endState = todolistsReducer(state, removeTodolistAC('1'))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('2')
})

test('todolists reducer should add todolist', () => {
    const endState = todolistsReducer(state, addTodolistAC('title'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('title')
})

test('todolists reducer should change todolist title', () => {
    const endState = todolistsReducer(state,
        changeTodolistTitleAC('1', 'things'))

    expect(endState[0].title).toBe('things')
})

