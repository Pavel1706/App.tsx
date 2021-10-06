import React from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {AppRootState} from "./state/store";
import {AddTaskAC} from "./state/tasks-reduser";
import { useDispatch, useSelector } from 'react-redux';
import {FilterValuesType} from "./AppWithRedux";
import { useCallback } from 'react';
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(  function (props: PropsType) {
    console.log('todolist is called')

    const tasks = useSelector<AppRootState, Array<TaskType>>(state=>state.tasks[props.id])
    const dispatch =  useDispatch()



    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.id,props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter,props.id]);

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    const addTask = useCallback((title:string)=>{
            dispatch(AddTaskAC(props.id, title))
    },[dispatch] )



    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}
        />
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} todolistId={props.id} task={t}/>)
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})




