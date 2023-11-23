import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";
import { firebaseContext } from "./store/Context";
import db from "./firebase/config";
import Context from "./store/Context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <firebaseContext.Provider value={{ db }}>
        <Context>
          <App />
        </Context>
      </firebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
