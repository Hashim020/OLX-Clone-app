import React, { useState, useContext } from 'react';
import { firebaseContext } from "../../store/Context";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')


  const { db } = useContext(firebaseContext)
  const auth = getAuth()
  const navigate = useNavigate()


  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, pass).then(() => {
        navigate('/'); 
    }).catch(Error => {
      alert(Error.message)
      console.log(Error)
    })
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
