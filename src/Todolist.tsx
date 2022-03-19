import React, {ChangeEvent} from "react";
import {filterValuesType, taskType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    title: string
    tasks: Array<taskType>
    removeTask: (todolistId: string, taskId: string) => void
    filter: filterValuesType
    changeFilter: (todolistId: string, filter: filterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             filter,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             todolistId,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle,
                             ...props
                         }: TodolistPropsType) => {


    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }


    const tasksArray = filteredTasks.map(t => {
        const onClickHandler = () => removeTask(todolistId, t.id)

        const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
        }

        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(todolistId, t.id, title)
        }

        return (
            <li key={t.id} className={t.isDone ? 'doneTask' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeCheckBox}/>
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                <button onClick={onClickHandler}>x</button>
            </li>)
    })

    const allFilter = () => changeFilter(todolistId, 'all')
    const activeFilter = () => changeFilter(todolistId, 'active')
    const completedFilter = () => changeFilter(todolistId, 'completed')


    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskItem = (title: string) => {
        addTask(todolistId, title)
    }

    const changeTlTitleHandler = (title: string) => {
      changeTodolistTitle(todolistId, title)
    }


    return (
        <div>
            <h3><EditableSpan title={title} changeTitle={changeTlTitleHandler}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskItem}/>
            <ul>
                {tasksArray}
            </ul>
            <div>
                <button className={filter === 'all' ? 'activeFilter' : ''} onClick={allFilter}>All</button>
                <button className={filter === 'active' ? 'activeFilter' : ''} onClick={activeFilter}>Active</button>
                <button className={filter === 'completed' ? 'activeFilter' : ''} onClick={completedFilter}>Completed
                </button>
            </div>
        </div>
    )
}


