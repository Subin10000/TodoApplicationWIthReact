import React from "react";
import "./App.css"

function App() {
  const [todos,setTodos] = React.useState([]);
  const [todo,setTodo] = React.useState("");
  const [todoEditing,settodoEditing] = React.useState(null);
  const [editingtext,setEditingText] = React.useState("");
  
  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if(loadedTodos){
      setTodos(loadedTodos);
    }
  },[])
  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos",temp)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault();
    if(todo!==""){
        const newtodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false
      }
      console.log(todos)
      console.log(newtodo.id)
      setTodos([...todos,newtodo])
      setTodo("")
    }else{
      alert("Please Enter Value")
    }
   
  }

  function deleteTodo(id){
    const updateTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updateTodos)
  }

  function toggleComplete(id){
    const updateTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setTodos(updateTodos);
  }

  function editTodo(id){
    const updateTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.text = editingtext;
      }
      return todo;
    })
    setTodos(updateTodos);
    settodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <h1 className="heading">Todo Application</h1>
      <form onSubmit={handleSubmit} className="form">

        <input type="text" className="inp" onChange={(e) => setTodo(e.target.value)} value={todo} placeholder="Enter Value"/>

        <button type="submit" className="btn">Add Todo</button>
        
      </form>

      {todos.map((todo)=> <div key={todo.id} className="lists">

        <div>
        {todoEditing === todo.id ? 
        (<input type="text"
        defaultValue={todo.text} 
        onChange={(e) => setEditingText(e.target.value)} />
        ) 
        : 
        (<div className="todoTxt">{todo.text}</div>)}

        </div>

        <div>
        <button onClick={() => deleteTodo(todo.id)} className="btn">Delete</button>
        <input 
        type="checkbox" 
        onChange={() => toggleComplete(todo.id)}
        checked={todo.completed}/>

        {todoEditing === todo.id ? (<button onClick={() => editTodo(todo.id)} className="btn">Submit Edit</button>) : (<button onClick={() => settodoEditing(todo.id)} className="btn">Edit</button>) }
        
        </div>
        </div>)}
    </div>
  );
}

export default App;
