import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}

export type filterValuesType = 'all' | 'active' | 'completed'

function App() {

    let initialTasks: Array<tasksType> = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]

    let [tasks, setTasks] = useState<Array<tasksType>>(initialTasks)
    let [filter, setFilter] = useState<filterValuesType>('all')

    const removeTask = (id: string) => {
        let copyTasks = [...tasks]
        setTasks(copyTasks.filter(t => t.id !== id))
    }

    const filterTasks = (filter: filterValuesType) => {
        setFilter(filter)
    }

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    } else if (filter === 'active') {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }

    return (
       <div className={'App'}>
           <Todolist
               title="What to learn"
               tasks={filteredTasks}
               removeTask={removeTask}
               filterTasks={filterTasks}
           />
       </div>
    );
}

export default App;
