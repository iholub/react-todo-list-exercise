import { useState, useContext } from 'react';
import { useTodoList, useTodoListDispatch } from './TodoListContext.js';
import Collapsible from 'react-collapsible';

export default function TodoList() {
  const todoList = useTodoList();
  return (
      <table>
        {todoList.map(todoItem => (
            <tr key={todoItem.id}>
              <TodoItem todoItem={todoItem} />
            </tr>
        ))}
      </table>
  );
}

function TodoItem({ todoItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTodoListDispatch();
  let content;
  if (isEditing) {
    let isSaveDisabled = todoItem.title === ''
    content = (
        <>
        <td>
          <TodoInEditMode todoItem={todoItem}/>
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
    content = (
        <>
        <td>
          <TodoInViewMode todoItem={todoItem}/>
        </td>
        <td>
          <button onClick={() => setIsEditing(true)} disabled={todoItem.done}>
            Edit
          </button>
          <button onClick={() => {
            dispatch({
              type: 'deleted',
              id: todoItem.id
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
            checked={todoItem.done}
            onChange={e => {
              dispatch({
                type: 'changed',
                todoItem: {
                  ...todoItem,
                  done: e.target.checked
                }
              });
            }}
        />
        </td>
        {content}
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

function TodoInEditMode({todoItem}) {
  const dispatch = useTodoListDispatch();
  return (
      <>
        <input
            placeholder="Title"
            value={todoItem.title}
            onChange={e => {
              dispatch({
                type: 'changed',
                todoItem: {
                  ...todoItem,
                  title: e.target.value
                }
              });
            }} />
        <input
            placeholder="Description"
            value={todoItem.description}
            onChange={e => {
              dispatch({
                type: 'changed',
                todoItem: {
                  ...todoItem,
                  description: e.target.value
                }
              });
            }} />
      </>
  );
}

function TodoInViewMode({todoItem}) {
  let content = todoItem.title;
  if (todoItem.done) {
    content = <s>{content}</s>;
  }
  if (todoItem.description !== '') {
    let descriptionContent = todoItem.description
    if (todoItem.done) {
      descriptionContent = <s>{descriptionContent}</s>;
    }
    content = <>{content}<CollapsibleDescription description={descriptionContent}/></>
  }

  return (
      <>{content}</>
  );
}