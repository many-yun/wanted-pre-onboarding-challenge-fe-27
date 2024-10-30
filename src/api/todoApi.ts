import axios from 'axios';
import { Todo } from '../types/todoTypes';

const API_URL = 'http://localhost:8080/todos';

export const getTodos = async (token: string): Todo => {
   const res = await axios.get(API_URL, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
};

export const getTodoById = async (id: string, token: string): Todo => {
   const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
};

export const createTodo = async (title: string, content: string, token: string): Todo => {
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

export const updateTodo = async (id: number, title: string, content: string, token: string): Todo => {
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

export const deleteTodo = async (id: number, token: string): Todo => {
   const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   return res.data;
};
