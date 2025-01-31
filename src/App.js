import React, { useState } from 'react';
import TodoItem from './TodoItem';

const App = () => {
  // Массив задач с дополнительными полями: completed и editable
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: false, editable: false },
    { id: 2, text: 'Task 2', completed: true, editable: false },
  ]);

  // Текущий фильтр задач
  const [filter, setFilter] = useState('all');

  // Функция добавления новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Уникальный идентификатор
      text,
      completed: false,
      editable: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Функция обновления текста задачи
  const updateTodoText = (id, updatedText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: updatedText, editable: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Функция переключения режима редактирования задачи
  const toggleEditMode = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, editable: !todo.editable };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Функция завершения задачи
  const markCompleted = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Функция удаления задачи
  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="app">
      <h1>ToDo List</h1>

      {/* Ввод новой задачи */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const inputElement = e.target.elements.namedItem('taskInput');
        if (inputElement.value.trim()) {
          addTodo(inputElement.value);
          inputElement.value = '';
        }
      }}>
        <input type="text" name="taskInput" placeholder="Enter a task..." />
        <button type="submit">Add Task</button>
      </form>

      {/* Выбор фильтра */}
      <div style={{ marginBottom: '10px' }}>
        Show:
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {/* Отображение отфильтрованного списка задач */}
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleEditMode={toggleEditMode}
            onUpdateTodoText={updateTodoText}
            onMarkCompleted={markCompleted}
            onRemoveTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;