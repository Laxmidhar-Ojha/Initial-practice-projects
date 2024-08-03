import {useState} from "react";


export default function TodoList(){
    let [todos,setTodos]=useState(["sample task"])
    let [newTodo,setNewTodo]=useState([""]);

    let addNewTask = ()=>{
      setTodos([...todos,newTodo])  ;
      setNewTodo("");
    };

    let updateTodoValue = (event)=>{
        setNewTodo(event.target.value);
    };

    return(
        <>
        <input placeholder="Add a task" value={newTodo} onChange={updateTodoValue}/> <br />
         <button onClick={addNewTask}>ADD TASK</button>
        <br /><br /><br /><br />
        <hr />
        <h4>Tasks todo</h4>
        <ul>{
             todos.map((todo)=>{
               return <li>{todo}</li>;
             })
            }
        </ul>
        </>
    )
}