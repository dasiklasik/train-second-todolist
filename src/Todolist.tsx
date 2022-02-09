import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, taskType} from "./App";
import './App.css'
import {SuperTitle} from "./SuperTitle/SuperTitle";

type TodolistPropsType = {
    title: string
    tasks: Array<taskType>
    removeTask: (todolistId: string, taskId: string) => void
    filterTasks: (todolistId: string, filter: filterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: filterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, title: string, taskId: string|undefined) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             filterTasks,
                             addTask,
                             changeStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             changeTodolistTitle,
                             changeTaskTitle, ...props
                         }: TodolistPropsType) => {

    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const filterAll = () => filterTasks(todolistId, 'all')
    const filterActive = () => filterTasks(todolistId, 'active')
    const filterCompleted = () => filterTasks(todolistId, 'completed')

    const addTaskHandler = () => {
        let title = value.trim()
        if (title !== '') {
            addTask(todolistId, value)
        } else {
            setError('Title is required!')
        }
        setValue('')
    }

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(e.currentTarget.value)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let title = value.trim()
            if (title !== '') {
                addTask(todolistId, value)
            } else {
                setError('Title is required!')
            }
            setValue('')
        }
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }


    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    } else if (filter === 'active') {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <div>
                <button onClick={removeTodolistHandler}>x</button>
                <h3><SuperTitle title={title}
                                changeTitle={changeTodolistTitle}
                                todolistId={todolistId}
                /></h3>

                <div>
                    <input className={error ? 'error' : ''} value={value} onKeyPress={onEnterHandler}
                           onChange={changeInputValueHandler}/>
                    <button onClick={addTaskHandler}>+</button>
                    {error ? <div className={'error-message'}>{error}</div> : <></>}
                </div>
                <ul>
                    {filteredTasks.map(t => <li key={t.id}>
                        <input type={'checkbox'} checked={t.isDone}
                               onChange={(e) =>
                                   changeStatus(todolistId, t.id, e.currentTarget.checked)}/>
                        <SuperTitle title={t.title} todolistId={todolistId} changeTitle={changeTaskTitle}/>
                        <button onClick={() => removeTask(todolistId, t.id)}>x</button>
                    </li>)}
                </ul>
                <div>
                    <button className={filter === 'all' ? 'active-filter' : ''} onClick={filterAll}>All</button>
                    <button className={filter === 'active' ? 'active-filter' : ''} onClick={filterActive}>Active
                    </button>
                    <button className={filter === 'completed' ? 'active-filter' : ''}
                            onClick={filterCompleted}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}