import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch employees when the component mounts
        axios.get('http://localhost:3001/employees')
            .then((response) => {
                setEmployees(response.data);
                setError('');
            })
            .catch((err) => {
                console.error('Error fetching employee data:', err);
                setError('Failed to fetch employees');
            });
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {employees.length > 0 ? (
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
                        {employees.map((employee) => (
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
