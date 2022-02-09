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
    let isAddDisabled = task.title === ''
    taskContent = (
        <>
        <td>
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
        </td>
        <td>
          <button
              disabled={isAddDisabled}
              onClick={() => setIsEditing(false)}>
            Save
          </button>
        </td>
    </>
    );
  } else {
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

    taskContent = (
        <>
        <td>
          {taskText}
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