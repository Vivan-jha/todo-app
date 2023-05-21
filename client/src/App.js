import { useState, useEffect } from 'react';
import axios from "axios";

import './app.css';
import Item from './components/Item';

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchTodoList = () => {
    axios.get("https://todolist-dgla.onrender.com/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const addUpdateTodo = () => {
    if (isUpdating === "") {
      axios.post("https://todolist-dgla.onrender.com/save-todo", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
          fetchTodoList(); // Fetch updated list after adding a todo
        })
        .catch((err) => console.log(err));
    } else {
      axios.post("https://todolist-dgla.onrender.com/update-todo", { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
          fetchTodoList(); // Fetch updated list after updating a todo
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteTodo = (_id) => {
    axios.post("https://todolist-dgla.onrender.com/delete-todo", { _id })
      .then((res) => {
        console.log(res.data);
        fetchTodoList(); // Fetch updated list after deleting a todo
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  };

  const sortList = () => {
    const sortedList = [...todo]; // Create a copy of the todo array
    sortedList.sort((a, b) => {
      // Compare the text property of the items based on the sort order
      if (sortOrder === "asc") {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
    setTodo(sortedList); // Update the sorted list
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle the sort order
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <div className="sort">
            <button onClick={sortList} className='sort-button'>Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})</button>
          </div>
          <input
            type="text"
            placeholder='Write Something...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={addUpdateTodo}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {todo.map(item => (
            <Item
              key={item._id}
              text={item.text}
              remove={() => deleteTodo(item._id)}
              update={() => updateTodo(item._id, item.text)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
