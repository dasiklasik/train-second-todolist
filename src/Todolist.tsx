import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, tasksType} from "./App";
import './App.css'

type TodolistPropsType = {
    title: string
    tasks: Array<tasksType>
    removeTask: (id: string) => void
    filterTasks: (filter: filterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             filterTasks,
                             addTask,
                             changeStatus, ...props
                         }: TodolistPropsType) => {

    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const filterAll = () => filterTasks('all')
    const filterActive = () => filterTasks('active')
    const filterCompleted = () => filterTasks('completed')

    const addTaskHandler = () => {
        let title = value.trim()
        if (title !== '') {
            addTask(value)
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
                addTask(value)
            } else {
                setError('Title is required!')
            }
            setValue('')
        }
    }




    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input className={error ? 'error' : ''} value={value} onKeyPress={onEnterHandler} onChange={changeInputValueHandler}/>
                    <button onClick={addTaskHandler}>+</button>
                    {error ? <div className={'error-message'}>{error}</div> : <></>}
                </div>
                <ul>
                    {tasks.map(t => <li key={t.id}>
                        <input type={'checkbox'} checked={t.isDone}
                               onChange={(e) => changeStatus(t.id, e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={() => removeTask(t.id)}>x</button>
                    </li>)}
                </ul>
                <div>
                    <button onClick={filterAll}>All</button>
                    <button onClick={filterActive}>Active</button>
                    <button onClick={filterCompleted}>Completed</button>
                </div>
            </div>
        </div>
    )
}