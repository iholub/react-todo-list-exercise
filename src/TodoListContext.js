import { createContext, useContext, useReducer } from 'react';
import { initialTodoList } from './TodoData.js';

const TodoListContext = createContext(null);

const TodoListDispatchContext = createContext(null);

export function TodoListProvider({ children }) {
  const [todoList, dispatch] = useReducer(
      todoListReducer,
      initialTodoList
  );

  return (
      <TodoListContext.Provider value={todoList}>
        <TodoListDispatchContext.Provider value={dispatch}>
          {children}
        </TodoListDispatchContext.Provider>
      </TodoListContext.Provider>
  );
}

export function useTodoList() {
  return useContext(TodoListContext);
}

export function useTodoListDispatch() {
  return useContext(TodoListDispatchContext);
}

function todoListReducer(todoList, action) {
  switch (action.type) {
    case 'added': {
      return [{
        id: action.id,
        title: action.title,
        description: action.description,
        done: false
      },
        ...todoList];
    }
    case 'changed': {
      return todoList.map(t => {
        if (t.id === action.todoItem.id) {
          return action.todoItem;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return todoList.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

