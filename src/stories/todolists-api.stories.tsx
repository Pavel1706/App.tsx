import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}





export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
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
        todolistsAPI.createTodolist(title)
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
        todolistsAPI.deleteTodolist(todolistId).then( (res) => {
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
        todolistsAPI.updateTodolist(todolistId,title)
            .then((res) => {
                setState(res.data)
            })

    }, [])



    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId]=useState<any>('')
    const getTask=()=> {

        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items);
            })
    }


    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>

        <button onClick={getTask}>get tasks</button>
    </div>
    </div>

}

export const DeleteTask = ()=> {
    const [state, setState]=useState<any>(null)
    const [taskId, setTaskId]=useState<any>('')
    const [todolistId, setTodolistId]=useState<any>('')

    const deleteTask = ()=> {
        todolistsAPI.deleteTask(todolistId,taskId)
            .then((res)=>{
                setState(res.data)
            })
    }


    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
        <button onClick={deleteTask}>delete task</button>
    </div>
    </div>
}
export const CreateTask = ()=> {
    const [state, setState]=useState<any>(null)
    const [title, setTitle]=useState<any>('')
    const [todolistId, setTodolistId]=useState<any>('')
        const createTask=()=> {
            todolistsAPI.createTask(todolistId, title)
                .then((res) => {
                    setState(res.data)
                })
        }
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>create task</button>
    </div>
    </div>
}

export const UpdateTask = ()=> {
    const [state, setState]=useState<any>(null)
    const [title, setTitle]=useState<any>('')
    const [todolistId, setTodolistId]=useState<any>('')
    const [taskId, setTaskId]=useState<any>('')
    // 226ed56f-c3e2-47fe-92eb-3cae58f76719
//this`s a good idea
    const upgradeTask = ()=> {
        todolistsAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'title'} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={upgradeTask}>upgrade task</button>
        </div>
    </div>
}

