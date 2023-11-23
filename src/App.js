import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route,useNavigate } from "react-router-dom";
import { authContext, firebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./store/postContext";
/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

function App() {
  const { setUser } = useContext(authContext);
  const { db } = useContext(firebaseContext);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  });
 

  

  return (
    <div>
      <Post>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path="/viewItem" element={<View></View>}></Route>
      </Routes>
      </Post>
    </div>
  );
}

export default App;
