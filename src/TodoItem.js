import React from 'react';

const TodoItem = ({
  todo,
  onToggleEditMode,
  onUpdateTodoText,
  onMarkCompleted,
  onRemoveTodo,
}) => {
  const { id, text, completed, editable } = todo;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onUpdateTodoText(id, event.target.value);
    }
  };

  return (
    <li>
      {!editable ? (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onMarkCompleted(id)}
          />
          <span
            style={{
              textDecoration: completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onDoubleClick={() => onToggleEditMode(id)}
          >
            {text}
          </span>
          <button onClick={() => onRemoveTodo(id)}>X</button>
        </>
      ) : (
        <input
          type="text"
          autoFocus
          defaultValue={text}
          onBlur={(e) => onUpdateTodoText(id, e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
    </li>
  );
};

export default TodoItem;