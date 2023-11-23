import React, { useState, useContext, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { firebaseContext } from "../../store/Context";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userName, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userNumber, setNumber] = useState('');
  const [userPass, setPass] = useState('');

  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();
  const auth = getAuth();
  const { db } = useContext(firebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (userName.trim() === '') {
      alert('Please enter a username.');
      nameRef.current.focus();
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
      alert('Please enter a valid email address.');
      emailRef.current.focus();
      return;
    }

    if (!/^\d{10}$/.test(userNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      mobileRef.current.focus();
      return;
    }

    if (userPass.length < 8) {
      alert('Password must be at least 8 characters long.');
      passRef.current.focus();
      return;
    }

    // Create user and add to Firestore
    createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set the user's display name
        updateProfile(user, {
          displayName: userName,
        })
          .then(() => {
            // Now, add the user's information to Firestore
            addDoc(collection(db, "users"), {
              id: user.uid,
              username: userName,
              phone: userNumber,
            });
          })
          .then(() => {
            // User profile updated and data added to Firestore
            console.log("User profile updated and data added to Firestore.");
            navigate("/login");
          })
          .catch((error) => {
            console.error(
              "Error updating profile or adding data to Firestore:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={userNumber}
            onChange={(e) => setNumber(e.target.value)}
            ref={mobileRef}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={userPass}
            onChange={(e) => setPass(e.target.value)}
            ref={passRef}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => navigate("/login")}>Login</a>
      </div>
    </div>
  );
}
