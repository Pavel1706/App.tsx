
const initialState:InitialStateType = {
    status: 'idle',
    error: 'some error!!!'
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypeApp): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setStatusAC=(status:RequestStatusType)=>{
    return {
type: 'APP/SET-STATUS',
        status
    } as const
}

export const setErrorAC = (error:string|null)=> ({type: 'APP/SET-ERROR',error} as const)

export type ActionsTypeApp = SetStatusType | SetErrorType

export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetStatusType =ReturnType<typeof setStatusAC>

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'



export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}