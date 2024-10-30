import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/auth/login');
   };

   return (
      <nav>
         <ul>
            <li>
               <Link to="/auth/login">Login</Link>
            </li>
            <li>
               <Link to="/auth/register">Register</Link>
            </li>
            <li>
               <Link to="/">Todo List</Link>
            </li>
            <li>
               <button onClick={handleLogout}>Logout</button>
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;
