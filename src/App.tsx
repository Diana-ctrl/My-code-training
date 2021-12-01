import React, { useState, useReducer } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { tasksReducer, RemoveTaskAC, AddTaskAC, ChangeStatusAC } from './TasksReducer'

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    
    let [tasks, tasksDispatch] = useReducer(tasksReducer, 
        [{ id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },]
    );

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        tasksDispatch(RemoveTaskAC(id));
    }

    function addTask(title: string) {
        // let task = { id: v1(), title: title, isDone: false };
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        tasksDispatch(AddTaskAC(title));
    }

    const changeStatus = (CurrentId: string, value: boolean) => {
        // console.log(value)
        // setTasks(tasks.map(m => m.id === CurrentId ? { ...m, isDone: value } : m))
        tasksDispatch(ChangeStatusAC(CurrentId, value));
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
