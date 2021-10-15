import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fae6bcdf-1b7b-4b5f-8f9c-eecd7cb26aa8'
    }
})


export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists',)
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>(`/todo-lists`, {title},)
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`/todo-lists/${todolistId}`,)

    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}

type CommonResponseType<T> = {
    resultCode: number
    fieldsErrors: string[]
    messages: Array<string>
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodoResponseType = {
    resultCode: number
    fieldsErrors: []
    messages: Array<string>
    data: {
        item: TodoType
    }
}

type UpdateDeleteTodoResponseType = {
    resultCode: number
    fieldsErrors: string[]
    messages: Array<string>
    data: {}
}
