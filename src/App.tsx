import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type tasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    let tasks1: Array<tasksType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: false}
    ]

    let tasks2: Array<tasksType> = [
        {id: 1, title: 'Milk', isDone: true},
        {id: 2, title: 'Potato', isDone: true},
        {id: 3, title: 'Water', isDone: false}
    ]

    return (
       <div className={'App'}>
           <Todolist title={'What to learn'} tasks={tasks1}/>
           <Todolist title={'What to buy'} tasks={tasks2}/>
       </div>
    );
}

export default App;
