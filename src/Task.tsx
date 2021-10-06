import {ChangeStatusTaskAC, ChangeTitleTaskAC, RemoveTaskAC} from "./state/tasks-reduser";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";
import { useDispatch } from "react-redux";
import { ChangeEvent } from "react";
import { Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React from "react";
import { useCallback } from "react";
type TaskPropsType ={
    todolistId: string
    task:TaskType
}


export const Task= React.memo(( props:TaskPropsType)=>{
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(RemoveTaskAC(props.task.id, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeStatusTaskAC(props.todolistId,newIsDoneValue,props.task.id))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(ChangeTitleTaskAC(props.todolistId,newValue,props.task.id));
    },[dispatch])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})