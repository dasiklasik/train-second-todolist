import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import { Menu } from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {
    addTaskAC,
    addTodolistTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTodolistTaskAC,
    tasksReducer
} from "./state/tasksReducer";
import { todolistId1, todolistId2 } from './App';
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "./state/store";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type todolistType = {
    id: string
    title: string
    filter: filterValuesType
}


export type tasksStateType = { [key: string]: Array<taskType> }

export type filterValuesType = 'all' | 'active' | 'completed'

export function AppWithReducers() {

    const todolists = useSelector<reducerType, Array<todolistType>>( state => state.todolists)
    const tasks = useSelector<reducerType, tasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // const [todolists, dispatchToTodolist] = useReducer(todolistsReducer,
    //     [
    //         {id: todolistId1, title: "What to learn", filter: "all"},
    //         {id: todolistId2, title: "What to buy", filter: "all"},
    //     ]
    // )

    // const [tasks, dispatchToTasks] = useReducer(tasksReducer,
    //     {
    //         [todolistId1]: [
    //             {id: v1(), title: 'HTML', isDone: true},
    //             {id: v1(), title: 'CSS', isDone: true},
    //             {id: v1(), title: 'JS', isDone: false},
    //             {id: v1(), title: 'React', isDone: false},
    //             {id: v1(), title: 'Redux', isDone: false},
    //         ],
    //         [todolistId2]: [
    //             {id: v1(), title: 'milk', isDone: true},
    //             {id: v1(), title: 'cheese', isDone: true},
    //             {id: v1(), title: 'apples', isDone: false},
    //         ],
    //     }
    // )


    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, filter: filterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(removeTodolistTaskAC(todolistId))
        // setTodolists(todolists.filter(tl => tl.id != todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const id = v1()
        dispatch(addTodolistAC(id, title))
        dispatch(addTodolistTasksAC(id))
        // setTodolists([...todolists, {id, title, filter: 'all'}])
        // setTasks({...tasks, [id]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }



    return (
       <div>
           <AppBar position={"static"}>
               <Toolbar>
                   <IconButton>
                       <Menu/>
                   </IconButton>
               </Toolbar>
           </AppBar>

           <div className="App">
               <Container fixed>
               <Grid container style={{padding: '20px'}}>
                   <AddItemForm addItem={addTodolist}/>
               </Grid>
                   <Grid container spacing={3}>
               {
                   todolists.map(tl => {

                       return (
                           <Grid item>
                               <Paper style={{padding: '10px'}}>
                           <Todolist title={tl.title}
                                     tasks={tasks[tl.id]}
                                     removeTask={removeTask}
                                     filter={tl.filter}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     todolistId={tl.id}
                                     removeTodolist={removeTodolist}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodolistTitle={changeTodolistTitle}
                           />
                               </Paper>
                           </Grid>
                       )
                   })
               }
                   </Grid>
               </Container>
           </div>
       </div>
    );
}
