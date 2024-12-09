import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch employees when the component mounts
        axios.get('http://localhost:3001/employees')
            .then((response) => {
                setEmployees(response.data);
                setFilteredEmployees(response.data); // Set initial filtered employees
                setError('');
            })
            .catch((err) => {
                console.error('Error fetching employee data:', err);
                setError('Failed to fetch employees');
            });
    }, []);

    useEffect(() => {
        // Filter employees when the search term changes
        setFilteredEmployees(
            employees.filter(
                (employee) =>
                    employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    employee.EmployeeID.toString().includes(searchTerm)
            )
        );
    }, [searchTerm, employees]);

    return (
        <div>
            <h2>Employee List</h2>

            {/* Search Input */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Employee ID or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {filteredEmployees.length > 0 ? (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Department</th>
                            <th>Date of Joining</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.EmployeeID}>
                                <td>{employee.EmployeeID}</td>
                                <td>{employee.EmployeeName}</td>
                                <td>{employee.Email}</td>
                                <td>{employee.PhoneNumber}</td>
                                <td>{employee.Department}</td>
                                <td>{employee.DateOfJoining.split('T')[0]}</td>
                                <td>{employee.Role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <div>No employees found</div>
            )}
        </div>
    );
}
