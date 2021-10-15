import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";
import axios from "axios";

export default {
    title: 'API'
}





export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'hey hey'
        todolistApi.createTodo(title)
            .then( (res) => {
        setState(res.data);
    } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'ca2f62a9-7f29-4e3d-a837-a2441247ac48'
        todolistApi.deleteTodo(todolistId).then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title= 'JS'
        const todolistId = '60e4d00b-25fe-4735-a28a-47a9a9896bd5'
        todolistApi.updateTodoTitle(todolistId,title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
