import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./Components/Login/LoginPage";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <Route exact path='/' render={(props) => (
                <LoginPage {...props}/>
            )}/>
        </Router>
    </div>
  );
}

export default App;
