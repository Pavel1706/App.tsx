import React, {useCallback, useEffect} from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import { AppRootStateType } from './store'
import {initializedAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import { Route } from 'react-router-dom'
import {Login} from "../features/Login";
import {CircularProgress} from "@mui/material";
import { logoutTC } from '../features/login-reducer'



type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state=>state.login.isLoggedIn)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(initializedAppTC())
    },[])


    const logOutHandler=useCallback(()=>{
        dispatch(logoutTC())
    },[])

    if(!isInitialized){
        return <div style={{position: "fixed", top:"30%", textAlign:"center", width:"100%"}} ><CircularProgress /></div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route  path={'/login'} render={() => <Login/>} />

                    <Route path={'/404'} render={() => <div>404</div>}/>
            </Container>
        </div>
    )
}

export default App
