import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isValid, setIsValid] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         navigate('/');
      }
   }, []);

   useEffect(() => {
      const emailValid = email.includes('@') && email.includes('.');
      const passwordValid = password.length >= 8;
      setIsValid(emailValid && passwordValid);
   }, [email, password]);

   const handleLogin = async () => {
      try {
         const res = await login(email, password);
         localStorage.setItem('token', res.token);
         navigate('/');
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div>
         <h2>Login</h2>
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
         <button onClick={handleLogin} disabled={!isValid}>
            Login
         </button>
      </div>
   );
};

export default Login;
