
import { useState } from 'react';

import CreateTodo from './components/Create-Todo/CreateTodo';
import './App.css';
import Todo from './components/Todo/Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoCount, setTodoCount] = useState(0);

  const onAddToDoitem = (e) => {
    setTodos((prevData) => [...prevData, e]);
    setTodoCount((prevCount) => ++prevCount);
  };
  const updateCount = (e) => {
    if (!e) {
      setTodoCount(prevCount => ++prevCount);
    } else {
      setTodoCount(prevCount => --prevCount);
    }
  };

  return (
    <div>
      <div className="header">
        <h3>Active Todo tasks: {todoCount}</h3>
        <CreateTodo handleTodoItem={onAddToDoitem} />
      </div>

      <div className="todos">
        {(todos.length) ?
          todos.map((todo, i) => <Todo key={i} todo={todo} id={i} onUpdateCount={updateCount} />)
          :
          <p>No todos added</p>
        }
      </div>

    </div>
  );
}

export default App;
