import AddTodoItem from './AddTodoItem.js';
import TodoList from './TodoList.js';
import { TodoListProvider } from './TodoListContext.js';

export default function TodoApp() {
  return (
      <TodoListProvider>
        <h1>Todo List</h1>
        <AddTodoItem />
        <TodoList />
      </TodoListProvider>
  );
}
