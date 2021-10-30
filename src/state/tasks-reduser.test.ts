import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";


test('remove task', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "JS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "React Book", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ]
    }
    const endState = tasksReducer(startTask, removeTaskAC('todolistId1','1'))



    expect(endState['todolistId1'].length).toBe(1);

})

test('add task', ()=> {


const startTask:TasksStateType  = {
    'todolistId1': [
        {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0, //integer
            addedDate: ''},
        {id: '2', title: "JS", status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0, //integer
            addedDate: ''}
    ],
    'todolistId2': [
        {id: '1', title: "Milk", status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0, //integer
            addedDate: ''},
        {id: '2', title: "React Book", status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0, //integer
            addedDate: ''}
    ]
}
const endState = tasksReducer(startTask,  addTaskAC('todolistId2','hello'))



expect(endState['todolistId1'].length).toBe(2);
expect(endState['todolistId2'].length).toBe(3);
expect(endState['todolistId2'][0].title).toBe('hello');
})

test('change status task', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "JS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "React Book", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ]
    }
    const endState = tasksReducer(startTask, changeTaskStatusAC('todolistId2',TaskStatuses.New, '1'))



    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);

})

test('change title task', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "JS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "React Book", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ]
    }
    const endState = tasksReducer(startTask, changeTaskTitleAC('todolistId2','congratulation', '1'))



    expect(endState['todolistId2'][0].title).toBe('congratulation');
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'][0].title).toBe('congratulation');
    expect(endState['todolistId2'][1].title).toBe("React Book");
    expect(endState['todolistId1'][0].title).toBe("HTML&CSS");


})

test('new property with new array should be added when new todolist is added', ()=> {


    const startTask:TasksStateType  = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "JS", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''},
            {id: '2', title: "React Book", status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0, //integer
                addedDate: ''}
        ]
    }


    const endState = tasksReducer(startTask, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find ( t=> t !== 'todolistId1' && t !== 'todolistId2')
    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', ()=> {

        const startTask:TasksStateType  = {
            'todolistId1': [
                {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed,
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: '',
                    order: 0, //integer
                    addedDate: ''},
                {id: '2', title: "JS", status: TaskStatuses.Completed,
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: '',
                    order: 0, //integer
                    addedDate: ''}
            ],
            'todolistId2': [
                {id: '1', title: "Milk", status: TaskStatuses.Completed,
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: '',
                    order: 0, //integer
                    addedDate: ''},
                {id: '2', title: "React Book", status: TaskStatuses.Completed,
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: '',
                    order: 0, //integer
                    addedDate: ''}
            ]
        }

    const action = removeTodolistAC('todolistId1')


    const endState = tasksReducer(startTask, action)

    const keys = Object.keys(endState);

        expect(keys.length).toBe(1)
    expect(endState['todolistId1']).not.toBeDefined();
    expect(endState['todolistId1']).toBeUndefined();


})


