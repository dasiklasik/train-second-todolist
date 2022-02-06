import React from "react";
import {filterValuesType, tasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<tasksType>
    removeTask: (id: string) => void
    filterTasks: (filter: filterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, filterTasks, ...props}: TodolistPropsType) => {

    const filterAll = () => filterTasks('all')
    const filterActive = () => filterTasks('active')
    const filterCompleted = () => filterTasks('completed')

    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks.map(t => <li key={t.id}>
                        <input type={'checkbox'} checked={t.isDone}/><span>{t.title}</span>
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