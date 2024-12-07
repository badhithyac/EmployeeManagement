import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
    return (
        <Router>
            <div>
                <h1>Employee Management System</h1>
                <nav>
                    <Link to="/">Employee List</Link> | <Link to="/add-employee">Add Employee</Link>
                </nav>
                <hr />
                <Routes>
                    {/* Route for Employee List */}
                    <Route path="/" element={<EmployeeList />} />
                    
                    {/* Route for Add Employee Form */}
                    <Route path="/add-employee" element={<EmployeeForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
