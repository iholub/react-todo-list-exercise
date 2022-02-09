import { useState, useContext } from 'react';
import { useTodoListDispatch } from './TodoListContext.js';

export default function AddTodoItem() {
  const [todoItem, setTodoItem] = useState({
    title: '',
    description: ''
  });
  const dispatch = useTodoListDispatch();
  let isAddDisabled = todoItem.title === ''
  return (
      <>
        <input
            placeholder="Add title"
            value={todoItem.title}
            onChange={e => setTodoItem({
              ...todoItem,
              title: e.target.value
            })}
        />
        <input
            placeholder="Add description"
            value={todoItem.description}
            onChange={e => setTodoItem({
              ...todoItem,
              description: e.target.value,
            })}
        />
        <button
            disabled={isAddDisabled}
            onClick={() => {
          setTodoItem({
            title: '',
            description: ''
          });
          dispatch({
            type: 'added',
            id: nextId++,
            title: todoItem.title,
            description: todoItem.description,
          });
        }}>Add</button>
      </>
  );
}

let nextId = 3;
