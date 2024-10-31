import { useState, useEffect, PropsWithChildren } from 'react';
import { Todo } from '../types/todoTypes';

interface TodoDetailProps {
   todo: Todo | null;
   onUpdate: (id: string, title: string, content: string) => void;
   onCancel: () => void;
}

const TodoDetail = ({ todo, onUpdate, onCancel }: PropsWithChildren<TodoDetailProps>) => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [updateBtnText, setUpdateBtnText] = useState('Update Todo')
   const [disabled, setDisabled] = useState(false)

   useEffect(() => {
      if (todo) {
         setTitle(todo.title);
         setContent(todo.content);
      } else {
         setTitle('');
         setContent('');
      }
   }, [todo]);

   const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (todo) {
         onUpdate(todo.id, title, content);
         setUpdateBtnText('Saved')
         setDisabled(true)
         setTimeout(() => {
            setUpdateBtnText('Update Todo')
            setDisabled(false)
         }, 800);
      }
   };

   return (
      <div>
         {todo ? (
            <div>
               <h3>Edit Todo</h3>
               <form onSubmit={handleUpdate}>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                  <button onClick={onCancel} type="button" className="btn-cancel">
                     Cancel
                  </button>
                  <button type="submit" disabled={disabled}>{updateBtnText}</button>
               </form>
            </div>
         ) : (
            <h3>확인할 todo를 클릭하세요.</h3>
         )}
      </div>
   );
};

export default TodoDetail;
