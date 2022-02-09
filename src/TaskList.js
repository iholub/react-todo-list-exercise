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
    let isAddDisabled = task.title === ''
    taskContent = (
        <>
          <input
              value={task.title}
              onChange={e => {
                dispatch({
                  type: 'changed',
                  task: {
                    ...task,
                    title: e.target.value
                  }
                });
              }} />
          <input
              value={task.description}
              onChange={e => {
                dispatch({
                  type: 'changed',
                  task: {
                    ...task,
                    description: e.target.value
                  }
                });
              }} />
          <button
              disabled={isAddDisabled}
              onClick={() => setIsEditing(false)}>
            Save
          </button>
        </>
    );
  } else {
    let taskText = task.title;
    if (task.description !== '') {
      taskText = taskText + " (" + task.description + ")";
    }
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
            disabled={isEditing}
            checked={task.done}
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
