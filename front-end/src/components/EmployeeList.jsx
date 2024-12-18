import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch employees when the component mounts
        axios.get('http://localhost:3001/employees')
            .then((response) => {
                setEmployees(response.data);
                setFilteredEmployees(response.data);
                extractDepartmentsAndRoles(response.data);
                setError('');
            })
            .catch((err) => {
                console.error('Error fetching employee data:', err);
                setError('Failed to fetch employees');
            });
    }, []);

    // Extract unique departments and roles
    const extractDepartmentsAndRoles = (data) => {
        const uniqueDepartments = [...new Set(data.map(emp => emp.Department))];
        const uniqueRoles = [...new Set(data.map(emp => emp.Role))];
        setDepartments(uniqueDepartments);
        setRoles(uniqueRoles);
    };

    useEffect(() => {
        // Apply search and filter functionality
        const filtered = employees.filter((employee) => {
            const matchesSearch = employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.EmployeeID.toString().includes(searchTerm);
            const matchesDepartment = selectedDepartment ? employee.Department === selectedDepartment : true;
            const matchesRole = selectedRole ? employee.Role === selectedRole : true;

            return matchesSearch && matchesDepartment && matchesRole;
        });
        setFilteredEmployees(filtered);
    }, [searchTerm, selectedDepartment, selectedRole, employees]);

    return (
        <div>
            <h2>Employee List</h2>

            {/* Search and Filter Options */}
            <div className="filter-container">
                {/* Search Input */}
                <div className="search-input filter-group">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search by Employee ID or Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter by Department */}
                <div className="filter-dropdown filter-group">
                    <i className="fas fa-filter"></i>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filter by Role */}
                <div className="filter-dropdown filter-group">
                    <i className="fas fa-briefcase"></i>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error Display */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Employee Table */}
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
