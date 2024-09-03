import React, {useState} from 'react';
import styles from './ToDoList.module.css'

function ToDoList(){

    const [tasks, setTasks] = useState(["Eat breakfast", "Walk the dog", "Save the world"]);
    const [newTask ,setNewtask] = useState("");

    function handleInputChange(e){
        setNewtask(e.target.value)
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(prevTasks =>[...prevTasks,newTask]);
            setNewtask("");
        }

    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if (index > 0){
            const updatedTasks =[...tasks];
            [updatedTasks[index], updatedTasks[index-1]] =
             [updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index){
        if (index < tasks.length - 1){
            const updatedTasks =[...tasks];
            [updatedTasks[index], updatedTasks[index+1]] =
             [updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    return(<div className={styles.toDoList}>
        <h1>To-Do List</h1>
        <div>
            <input  type="text"
                    placeholder='Enter a task...'
                    value = {newTask}
                    onChange={handleInputChange}/>
            <button 
            className={styles.addButton}
            onClick = {addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task,index) => 
            <li key={index}>
                <span className={styles.text}>{task}</span>
                <button onClick={()=>deleteTask(index)} className={styles.deleteButton}>
                    Done ✔️
                </button>
                <button onClick={()=>moveTaskUp(index)} className={styles.moveButton}>
                    ⬆️
                </button>
                <button onClick={()=>moveTaskDown(index)} className={styles.moveButton}>
                    ⬇️
                </button>
            </li>)}
        </ol>

    </div>);
}

export default ToDoList;