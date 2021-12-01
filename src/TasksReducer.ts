import { TaskType } from './Todolist';
import { v1 } from 'uuid';


export const taskReducer = (state: Array<TaskType>, action: AllActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TASK': {
            return [...state, { id: v1(), title: action.title, isDone: false }];
        }
        case 'CHANGE-STATUS': {
            return state.map(t => t.id === action.id ? {...state, isDone: action.value} : t);
        }
        default:
            return state;
    }
}
type AllActionsType = RemoveTaskACType | AddTaskACType | ChangeStatusACType;
type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>;
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeStatusACType = ReturnType<typeof ChangeStatusAC>

export const RemoveTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
    } as const
};

export const AddTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        title,
    } as const
};

export const ChangeStatusAC = (CurrentId: string, value: boolean) => {
    return { 
        type: 'CHANGE-STATUS',
        id: CurrentId, 
        value,
    } as const
};