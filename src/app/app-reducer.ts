import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {isLoggenInAC} from "../features/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// import {setIsLoggedInAC} from "../features/login-reducer";

const initialState:InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer;
export const setAppStatusAC = slice.actions.setAppStatusAC
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppInitializedAC = slice.actions.setAppInitializedAC


export const initializedAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggenInAC({value: true}))

                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {

            }
            dispatch(setAppInitializedAC({value: true}))
        })

}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "APP/SET-INITIALIZED":
//             return {...state, isInitialized:action.value}
//         default:
//             return {...state}
//     }
// }


 type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)


// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
//
// type ActionsType =
//     | SetAppErrorActionType
//     | SetAppStatusActionType
//     | SetAppInitializedActionType
