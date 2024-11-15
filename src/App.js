import React, { useState, useRef, useEffect } from "react";
import "./todo.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if(todo!== ''){
      setTodos([...todos, {list:todo,id:Date.now(),status: false}]);
    // console.log(todos);
    setTodo("  ");
    }
    if(editId){
      const editTodo = todos.find((todo) => todo.id == editId)
      const updateTodo = todos.map((to)=>to.id === editTodo.id
      ? (to = {id: to.id , list :  todo})
      : (to = {id: to.id , list : to.list}))
      setTodos(updateTodo)
      setEditId(0);
      setTodo('')
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setTodos(todos.filter ((to) => to.id !== id))
  }

  const onComplete = (id) => {
let complete = todos.map((list)=>{
  if(list.id === id){
    return({...list,status : !list.status})
  }
  return list
})
setTodos(complete)
  }

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    <div className="container">
      <h1>TODO APP</h1>

      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task here..."
          className="form-control"
          value={todo}
          ref={inputRef}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <button onClick={addTodo}>{editId ? 'UPDATE' : 'ADD'}</button>
      </form>

      <div className="list">
        <ul>
          {todos.map((task) => (
            <li className="list-items">
              <div className="list-item-list" id={task.status ? 'list-item' : ''}>{task.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(task.id)}
                />
                <FaEdit className="list-item-icons" id="edit" title="Edit" onClick={() => onEdit(task.id)}/>
                <MdDeleteForever
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(task.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
