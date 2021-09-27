import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import { useReducer } from 'react';
import {AddTaskAC, ChangeStatusTaskAC, ChangeTitleTaskAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reduser";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeNameTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(todolistId: string, taskId: string) {
        const action = RemoveTaskAC(todolistId,taskId)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = AddTaskAC(todolistId,title)
        dispatchToTasksReducer(action)

    }

    function changeStatus(todolistId: string, isDone: boolean, taskId: string) {
        const action = ChangeStatusTaskAC(todolistId,isDone,taskId)
        dispatchToTasksReducer(action)

    }

    function changeTaskTitle(todolistId: string, newTitle: string, taskId: string) {
        const action = ChangeTitleTaskAC(todolistId,newTitle,taskId)
        dispatchToTasksReducer(action)

    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        const action = ChangeFilterTodolistAC(filter,todolistId)
        dispatchToTodolistReducer(action)
    }

    function removeTodolist(todolistId1: string) {
        const action = RemoveTodolistAC(todolistId1)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)

    }

    function changeTodolistTitle(title: string, id: string) {
        const action = ChangeNameTodolistAC(title,id)
        dispatchToTodolistReducer(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
