import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask({ onAddTask }) {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const dispatch = useTasksDispatch();
  let isAddDisabled = task.title === ''
  return (
      <>
        <input
            placeholder="Add title"
            value={task.title}
            onChange={e => setTask({
              ...task,
              title: e.target.value
            })}
        />
        <input
            placeholder="Add description"
            value={task.description}
            onChange={e => setTask({
              ...task,
              description: e.target.value,
            })}
        />
        <button
            disabled={isAddDisabled}
            onClick={() => {
          setTask({
            title: '',
            description: ''
          });
          dispatch({
            type: 'added',
            id: nextId++,
            title: task.title,
            description: task.description,
          });
        }}>Add</button>
      </>
  );
}

let nextId = 3;
