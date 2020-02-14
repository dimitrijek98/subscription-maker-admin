import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./Components/Login/LoginPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";

function App() {
  return (
    <div className="App">
        <Router>
            <Route exact path='/' render={(props) => (
                <LoginPage {...props}/>
            )}/>
            <Route exact path='/adminDashboard' render={(props) => (
                <AdminDashboard {...props}/>
            )}/>
            <Route exact path='/employeeDashboard' render={(props) => (
                <EmployeeDashboard {...props}/>
            )}/>
        </Router>
    </div>
  );
}

export default App;
