import React from "react";
import {tasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<tasksType>
}

export const Todolist = ({title, tasks, ...props}: TodolistPropsType) => {
    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks.map(t => <li key={t.id}><input type={'checkbox'} checked={t.isDone}/><span>{t.title}</span></li>)}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}