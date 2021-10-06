import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeNameTodolistAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import { useDispatch, useSelector } from 'react-redux';
import {AppRootState} from "./state/store";
import { useCallback } from 'react';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}



function AppWithRedux() {
    console.log('AppWithRedux is called')
    const dispatch =  useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)


    const changeFilter= useCallback(function (filter: FilterValuesType, todolistId: string) {
        dispatch(ChangeFilterTodolistAC(filter,todolistId))
    }, [dispatch])

    const removeTodolist= useCallback(function (todolistId1: string) {
        dispatch(RemoveTodolistAC(todolistId1))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, id: string)=> {
        dispatch(ChangeNameTodolistAC(title,id))
    },[dispatch])

    const addTodolist= useCallback(function (title: string) {
        dispatch(AddTodolistAC(title))
    },[dispatch])

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


                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}

                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
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

export default AppWithRedux;
