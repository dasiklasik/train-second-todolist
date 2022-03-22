import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {tasksStateType, todolistId1, todolistId2} from "../App";
import {v1} from "uuid";

let state:tasksStateType

beforeEach(() => {
    return state = {
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
})

test('tasks reducer should remove task', () => {
    const endState = tasksReducer(state, removeTaskAC(todolistId1, state[todolistId1][0].id))

    expect(endState[todolistId1][0].id).toBe(state[todolistId1][1].id)
})

test('tasks reducer should add new task', () => {
    const endState = tasksReducer(state, addTaskAC(todolistId1, 'my'))

    expect(endState[todolistId1].length).toBe(6)
})

test('tasks reducer should change task status', () => {
    const endState = tasksReducer(state, changeTaskStatusAC(todolistId1, state[todolistId1][0].id, false))

    expect(endState[todolistId1][0].isDone).toBe(false)
})

test('tasks reducer should change task title', () => {
    const endState = tasksReducer(state, changeTaskTitleAC(todolistId1, state[todolistId1][0].id, 'some title'))

    expect(endState[todolistId1][0].title).toBe('some title')
})