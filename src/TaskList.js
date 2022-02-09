import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';
import Collapsible from 'react-collapsible';

export default function TaskList() {
  const tasks = useTasks();
  return (
      <table>
        {tasks.map(task => (
            <tr key={task.id}>
              <Task task={task} />
            </tr>
        ))}
      </table>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    let isSaveDisabled = task.title === ''
    taskContent = (
        <>
        <td>
          <TaskInEditMode task={task}/>
        </td>
        <td>
          <button
              disabled={isSaveDisabled}
              onClick={() => setIsEditing(false)}>
            Save
          </button>
        </td>
    </>
    );
  } else {
    taskContent = (
        <>
        <td>
          <TaskInViewMode task={task}/>
        </td>
        <td>
          <button onClick={() => setIsEditing(true)} disabled={task.done}>
            Edit
          </button>
          <button onClick={() => {
            dispatch({
              type: 'deleted',
              id: task.id
            });
          }}>
            Delete
          </button>
        </td>
        </>
    );
  }
  return (
      <>
        <td>
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
        </td>
        {taskContent}
      </>
  );
}

function CollapsibleDescription({description}) {
  return (
      <Collapsible trigger=">>" triggerWhenOpen="<<">
          {description}
      </Collapsible>
  );
}

function TaskInEditMode({task}) {
  const dispatch = useTasksDispatch();
  return (
      <>
        <input
            placeholder="Title"
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
            placeholder="Description"
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
      </>
  );
}

function TaskInViewMode({task}) {
  let taskText = task.title;
  if (task.done) {
    taskText = <s>{taskText}</s>;
  }
  if (task.description !== '') {
    let taskDesc = task.description
    if (task.done) {
      taskDesc = <s>{taskDesc}</s>;
    }
    taskText = <>{taskText}<CollapsibleDescription description={taskDesc}/></>
  }

  return (
      <>{taskText}</>
  );
}