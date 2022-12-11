import { useState, useRef } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([
    {id: 1, name: "Todo1", completed: false},
    {id: 2, name: "Todo2", completed: true},
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = (e) => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleDeleteCompletedTodo = (e) => {
    const newTodos = [...todos].filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleDeleteCompletedTodo}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
