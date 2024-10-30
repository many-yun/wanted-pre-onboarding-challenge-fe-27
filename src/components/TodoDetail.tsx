import React, { useState, useEffect } from 'react';

const TodoDetail = ({ todo, onUpdate, onCancel }) => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

   useEffect(() => {
      if (todo) {
         setTitle(todo.title);
         setContent(todo.content);
      } else {
         setTitle('');
         setContent('');
      }
   }, [todo]);

   const handleUpdate = (e) => {
      e.preventDefault();
      if (todo) {
         onUpdate(todo.id, title, content);
      }
   };

   return (
      <div>
         {todo ? (
            <div>
               <h3>Edit Todo</h3>
               <form onSubmit={handleUpdate}>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} required />
                  <button onClick={onCancel} type="button" className="btn-cancel">
                     Cancel
                  </button>
                  <button type="submit">Update Todo</button>
               </form>
            </div>
         ) : (
            <h3>확인할 todo를 클릭하세요.</h3>
         )}
      </div>
   );
};

export default TodoDetail;
