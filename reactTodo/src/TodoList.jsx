import {useState} from "react";
import {v4 as uuidv4} from 'uuid';


export default function TodoList(){
    let [todos,setTodos]=useState([{task:"sample-task",id:uuidv4(),isDone:false,}]);
    let [newTodo,setNewTodo]=useState([""]);

    let addNewTask = ()=>{
      setTodos((prevTodo)=>{
        return [...prevTodo,{task:newTodo,id:uuidv4(),isDone:false,}]
      });  ;
      setNewTodo("");
    };

    let updateTodoValue = (event)=>{
        setNewTodo(event.target.value);
    };

    let deleteTodo=(id)=>{
     setTodos((prevtodos)=>(todos.filter((prevtodos)=>prevtodos.id!=id)) )
    }

    let markAllAsDone=()=>{
      setTodos((prevTodos)=>(
        prevTodos.map((todo)=>{
          return{
            ...todo,
           isDone:todo.isDone? false : true 
          }})
      ))
    };

    let markAsDone=(id)=>{
      setTodos((prevTodos)=>
        prevTodos.map((todo)=>{
          if(todo.id===id){
            // let isDone=todo.isDone;
            return{
              ...todo,
              isDone: todo.isDone? false : true ,
            }; }
            else{
              return todo;
            }
          })
    );
      };

    return(
        <>
        <input placeholder="Add a task" value={newTodo} onChange={updateTodoValue}/> <br />
         <button onClick={addNewTask}>ADD TASK</button>
        <br /><br /><br /><br />
        <hr />
        <h4>Tasks todo</h4>
        <ul>{
             todos.map((todo)=>(
             <li key={todo.id}>
              <span  style={todo.isDone?{textDecorationLine:"line-through"}:{textDecorationLine:"none"}}> {todo.task} </span>
              &nbsp;&nbsp;
              <button onClick={()=>deleteTodo(todo.id)}>DEL</button> &nbsp;&nbsp;
              <button onClick={()=>{markAsDone(todo.id)}}>Mark as Done</button>
             </li>
             ))
            }
        </ul>
        <br /><br />
        <button onClick={markAllAsDone}>Mark All As Done</button>
        </>
    )
}
