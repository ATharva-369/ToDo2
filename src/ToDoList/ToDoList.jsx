import React, {useState, useEffect} from 'react';
import styles from './ToDoList.module.css'
import doneSound from '../assets/sound.mp3'
import deleteSound from '../assets/sound2.mp3'
import moveSound from '../assets/sound3.mp3'
import addSound from '../assets/sound4.mp3'
import clearSound from '../assets/sound5.mp3'

function ToDoList(){

    useEffect(() => {
        loadTasks();
      }, []);

    const [tasks, setTasks] = useState([]);
    const [newTask ,setNewtask] = useState("");

    function handleInputChange(e){
        setNewtask(e.target.value)
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(prevTasks =>[...prevTasks,newTask]);
            setNewtask("");
            new Audio(addSound).play()
        }
        else{

        }

    }
    
    function completeTask(e){
        e.target.parentElement.firstChild.style.setProperty("text-decoration-line","line-through");
        new Audio(doneSound).play();
    }

    function deleteTask(e,index){
        const updatedTasks = tasks.filter((_,i) => i !== index);
        setTasks(updatedTasks);
        if (tasks.length <= 1){
            new Audio(clearSound).play()
        }
        else{ new Audio(deleteSound).play();}
        
    }

    function moveTaskUp(index){
        if (index > 0){
            const updatedTasks =[...tasks];
            [updatedTasks[index], updatedTasks[index-1]] =
             [updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks)
        }
        new Audio(moveSound).play()
    }

    function moveTaskDown(index){
        if (index < tasks.length - 1){
            const updatedTasks =[...tasks];
            [updatedTasks[index], updatedTasks[index+1]] =
             [updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks)
        }
        new Audio(moveSound).play()
    }

    function saveLocal(){
        window.localStorage.setItem("tasks",JSON.stringify(tasks))
    };
    function loadTasks(){
        if (JSON.parse(window.localStorage.getItem("tasks")).length === 0){
            window.localStorage.setItem("tasks",JSON.stringify(["a","b","c"]))
        }
        setTasks(JSON.parse(window.localStorage.getItem("tasks")))

    };
      

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
            <button 
            className={styles.addButton}
            onClick = {() => {saveLocal()}}>
                Save Locally
            </button>
        </div>

        <ol>
            {tasks.map((task,index) => 
            <li key={index}>
                <span className={styles.text}>{task}</span>
                <button onClick={(e)=>completeTask(e)} className={styles.completeButton}>
                    Done ✔️
                </button>
                <button onClick={()=>moveTaskUp(index)} className={styles.moveButton}>
                    ⬆️
                </button>
                <button onClick={()=>moveTaskDown(index)} className={styles.moveButton}>
                    ⬇️
                </button>
                <button onClick={(e)=>deleteTask(e,index)} className={styles.deleteButton}>
                    Delete 🗑️
                </button>
            </li>)}
        </ol>

    </div>);
}

export default ToDoList;