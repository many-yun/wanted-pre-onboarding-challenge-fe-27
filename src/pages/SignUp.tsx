import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/authApi';

const SignUp = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isValid, setIsValid] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         navigate('/');
      }
   }, [navigate]);

   useEffect(() => {
      const emailValid = email.includes('@') && email.includes('.');
      const passwordValid = password.length >= 8;
      setIsValid(emailValid && passwordValid);
   }, [email, password]);

   const handleSignUp = async () => {
      try {
         await signUp(email, password);
         alert('회원가입 되었습니다. 로그인을 해주세요.');
         navigate('/auth/login');
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div>
         <h2>SignUp</h2>
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
         <button onClick={handleSignUp} disabled={!isValid}>
            SignUp
         </button>
      </div>
   );
};

export default SignUp;
