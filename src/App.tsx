import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';

const App = () => {
   const token = localStorage.getItem('token');

   const PrivateRoute = () => {
      return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
   };

   const handleInvalidToken = () => {
      if (!token) return;

      // 토큰 유효성 검사
      const isTokenValid = true; // 실제 유효성 검사를 구현하세요
      if (!isTokenValid) {
         localStorage.removeItem('token');
         window.location.href = '/auth/login';
      }
   };

   useEffect(() => {
      handleInvalidToken();
   }, [token]);

   return (
      <Router>
         <Navbar />
         <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
               <Route path="/" element={<TodoList />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </Router>
   );
};

export default App;
