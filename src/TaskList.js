import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
      <ul>
        {tasks.map(task => (
            <li key={task.id}>
              <Task task={task} />
            </li>
        ))}
      </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
        <>
          <input
              value={task.text}
              onChange={e => {
                dispatch({
                  type: 'changed',
                  task: {
                    ...task,
                    text: e.target.value
                  }
                });
              }} />
          <button onClick={() => setIsEditing(false)}>
            Save
          </button>
        </>
    );
  } else {
    let taskText = task.text;
    if (task.done) {
      taskText = <s>{taskText}</s>;
    }
    taskContent = (
        <>
          {taskText}
          <button onClick={() => setIsEditing(true)} disabled={task.done}>
            Edit
          </button>
        </>
    );
  }
  return (
      <label>
        <input
            type="checkbox"
            checked={task.done}
            disabled={task.done}
            onChange={e => {
              dispatch({
                type: 'changed',
                task: {
                  ...task,
                  done: e.target.checked
                }
              });
            }}
        />
        {taskContent}
        <button onClick={() => {
          dispatch({
            type: 'deleted',
            id: task.id
          });
        }}>
          Delete
        </button>
      </label>
  );
}
