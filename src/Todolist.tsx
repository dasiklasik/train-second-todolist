import React, {ChangeEvent} from "react";
import {filterValuesType, taskType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
            <div key={t.id} className={t.isDone ? 'doneTask' : ''}>
                <Checkbox color={'secondary'} icon={<FavoriteBorderIcon/>} checkedIcon={<FavoriteIcon/>} checked={t.isDone} onChange={onChangeCheckBox}/>
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>)
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
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskItem}/>
            <div>
                {tasksArray}
            </div>
            <div>
                <Button size={'small'} variant={'contained'} color={filter === 'all' ? 'secondary' : 'primary'} onClick={allFilter}>All</Button>
                <Button size={'small'} variant={'contained'} color={filter === 'active' ? 'secondary' : 'primary'}  onClick={activeFilter}>Active</Button>
                <Button size={'small'} variant={'contained'} color={filter === 'completed' ? 'secondary' : 'primary'} onClick={completedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}


