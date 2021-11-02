import {setAppStatusAC, setErrorAC, SetErrorType, SetStatusType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorType | SetStatusType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetErrorType | SetStatusType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}