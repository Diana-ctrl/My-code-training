import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (CurrentId: string, value: boolean) => void
    filter:FilterValuesType
}

export function Todolist({filter,...props}: PropsType) {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string|boolean>(false)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
            setError(false)
        }else{
            setError('Title is required')
            setTitle("");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(title.length>=5){
            setError('Title is too length')
        }else{
            setError(false)
        }

        // setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
            // setError(false)
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const onChangeHandlerForChangeStatus=(CurrentId: string,event:ChangeEvent<HTMLInputElement>)=>{
        props.changeStatus(CurrentId,event.currentTarget.checked)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    // const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeStatus(t.id, event.currentTarget.checked)
                    // }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>

                        <span className={t.isDone ? styles.isDone : ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

        <div>
            <button className={filter==='all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter==='active' ? styles.activeFilter : ''}  onClick={onActiveClickHandler}>Active</button>
            <button className={filter==='completed' ? styles.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
