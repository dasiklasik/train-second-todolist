import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type todolistType = {
    id: string
    title: string
    filter: filterValuesType
}

type todolistTasksType = {
    [key: string]: Array<taskType>
}

export type filterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();


    const initialTasks: todolistTasksType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Potato', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ],
    }

    let [tasks, setTasks] = useState<todolistTasksType>(initialTasks)
    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const filterTasks = (todolistId: string, filter: filterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
      setTodolists(todolists.filter(tl => tl.id !== todolistId))
        let copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
      setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const changeTaskTitle = (todolistId: string, title: string, taskId: string|undefined) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId]
            .map(t => t.id === taskId ? {...t, title} : t)})
    }

    return (
        <div className={'App'}>
            {todolists.map(tl => {
                return (
                    <Todolist
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        todolistId={tl.id}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
