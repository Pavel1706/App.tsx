import {Dispatch} from "redux"
import {
    setAppStatusAC,
} from "../app/app-reducer"
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value:boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const loginReducer = slice.reducer;
export const isLoggenInAC = slice.actions.setIsLoggedInAC
// (state:LoginAuthType = initialState, action: ActionsType):LoginAuthType => {
// switch (action.type) {
//     case "login/SET-IS-LOGGED-IN":
//         return {...state,
//         isLoggedIn: action.value}
//     default:
//         return state
//     }
// }

// actions

// export const setIsLoggedInAC = (value:boolean) => ({
//     type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggenInAC({value:true}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(isLoggenInAC({value:false}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// const a1 = {
//     type : 'SET-IS-LOGIN-IN',
//     payload: {
//         value: true,
//     }
// }



// type ActionsType = ReturnType<typeof setIsLoggedInAC>

// type LoginAuthType={
//     isLoggedIn:boolean
// }

// type ThunkDispatch = Dispatch< SetAppStatusActionType | SetAppErrorActionType>
