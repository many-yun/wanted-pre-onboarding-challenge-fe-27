import { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/todoApi';
import { Todo } from '../types/todoTypes';
import TodoDetail from '../components/TodoDetail';
import './TodoList.css';

const TodoList = () => {
   const [todos, setTodos] = useState<Todo[]>([]);
   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

   useEffect(() => {
      const fetchTodos = async () => {
         const todosData = await getTodos();
         setTodos(todosData.data);
      };

      fetchTodos();
   }, []);

   const handleAddTodo = async (e: React.FormEvent) => {
      e.preventDefault();
      const title = (e.target as HTMLFormElement).title.value;
      const content = (e.target as HTMLFormElement).content.value;

      if (title.trim() === '' || content.trim() === '') return;

      try {
         const createdTodo: Todo = await createTodo(title, content);
         setTodos((prev) => [...prev, createdTodo.data]);
         e.target.reset();
      } catch (err) {
         console.error(err);
      }
   };

   const handleSelectTodo = (todo: Todo) => {
      setSelectedTodo(todo);
   };

   const handleUpdateTodo = async (id: string, title: string, content: string) => {
      try {
         const updatedTodo = await updateTodo(id, title, content);
         setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.data.id ? updatedTodo.data : todo)));
         setSelectedTodo(updatedTodo.data);
      } catch (err) {
         console.error(err);
      }
   };

   const handleDeleteTodo = async (id: string) => {
      try {
         await deleteTodo(id);
         setTodos((prev) => prev.filter((todo) => todo.id !== id));
         if (selectedTodo?.id === id) {
            setSelectedTodo(null);
         }
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className="container">
         <div className="todo-list">
            <h2>Todo List</h2>
            <form onSubmit={handleAddTodo}>
               <input name="title" type="text" placeholder="Title" required />
               <textarea name="content" placeholder="Content" required />
               <button type="submit">Add Todo</button>
            </form>
            <ul>
               {todos.map((todo) => (
                  <li className="todo-item" key={todo.id}>
                     <p onClick={() => handleSelectTodo(todo)}>{todo.title}</p>
                     <button className="btn-delete" onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                     </button>
                  </li>
               ))}
            </ul>
         </div>

         <div className="todo-detail">
            <TodoDetail todo={selectedTodo} onUpdate={handleUpdateTodo} onCancel={() => setSelectedTodo(null)} />
         </div>
      </div>
   );
};

export default TodoList;
