import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import { Menu } from '@mui/icons-material';

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

export const todolistId1 = v1()
export const todolistId2 = v1()

export type tasksStateType = { [key: string]: Array<taskType> }

export type filterValuesType = 'all' | 'active' | 'completed'

function App() {




    const [todolists, setTodolists] = useState<Array<todolistType>>(
        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"},
        ]
    )

    const [tasks, setTasks] = useState<tasksStateType>(
        {
            [todolistId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: 'milk', isDone: true},
                {id: v1(), title: 'cheese', isDone: true},
                {id: v1(), title: 'apples', isDone: false},
            ],
        }
    )


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != taskId)})
    }

    const changeFilter = (todolistId: string, filter: filterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id != todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const id = v1()
        setTodolists([...todolists, {id, title, filter: 'all'}])
        setTasks({...tasks, [id]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? {...t, title} : t)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
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

export default App;
