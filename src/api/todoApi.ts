import axios from 'axios';
import { Todo } from '../types/todoTypes';

const API_URL = 'http://localhost:8080/todos';
const token = localStorage.getItem('token');

export const getTodos = async (): Promise<Todo> => {
   const res = await axios.get(API_URL, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
};

export const getTodoById = async (id: string): Promise<Todo> => {
   const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
};

export const createTodo = async (title: string, content: string): Promise<Todo> => {
   const res = await axios.post(
      API_URL,
      { title, content },
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   );
   return res.data;
};

export const updateTodo = async (id: string, title: string, content: string): Promise<Todo> => {
   const res = await axios.put(
      `${API_URL}/${id}`,
      { title, content },
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   );
   return res.data;
};

export const deleteTodo = async (id: string): Promise<Todo> => {
   const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
};
