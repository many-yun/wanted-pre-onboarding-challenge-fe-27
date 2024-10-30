import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (email: string, password: string) => {
   const res = await axios.post(`${API_URL}/users/login`, { email, password });
   return res.data;
};

export const signUp = async (email: string, password: string) => {
   await axios.post(`${API_URL}/users/create`, { email, password });
};
