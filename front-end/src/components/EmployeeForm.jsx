import React, { useState } from 'react';
import axios from 'axios';

export default function EmployeeForm() {
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeID: '',
        employeeEmail: '',
        phoneNumber: '',
        department: '',
        dateOfJoining: '',
        role: '',
    });

    const [errors, setErrors] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.employeeName) newErrors.employeeName = "Employee Name is required";
        if (!formData.employeeID) newErrors.employeeID = "Employee ID is required";
        if (!formData.employeeEmail) newErrors.employeeEmail = "Valid Email is required";
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is required";
        } else if (formData.phoneNumber.length != 10) {
            newErrors.phoneNumber = "Phone Number must be at least 10 digits";
        }
        if (!formData.department) newErrors.department = "Department is required";
        if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of Joining is required";
        if (!formData.role) newErrors.role = "Role is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:3001/addEmployee', formData);
            setFeedbackMessage(response.data.message);
            setFormData({
                employeeName: '',
                employeeID: '',
                employeeEmail: '',
                phoneNumber: '',
                department: '',
                dateOfJoining: '',
                role: '',
            });
            setErrors({});
        } catch (error) {
            setFeedbackMessage(error.response?.data?.message || 'Submission failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Employee Name: <span style={{ color: 'red' }}>*</span>
                <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                />
                {errors.employeeName && <div style={{ color: 'red' }}>{errors.employeeName}</div>}
            </label>
            <br />
            <br />

            <label>
                Employee ID: <span style={{ color: 'red' }}>*</span>
                <input
                    type="text"
                    name="employeeID"
                    value={formData.employeeID}
                    onChange={handleChange}
                />
                {errors.employeeID && <div style={{ color: 'red' }}>{errors.employeeID}</div>}
            </label>
            <br />
            <br />

            <label>
                Email: <span style={{ color: 'red' }}>*</span>
                <input
                    type="email"
                    name="employeeEmail"
                    value={formData.employeeEmail}
                    onChange={handleChange}
                />
                {errors.employeeEmail && <div style={{ color: 'red' }}>{errors.employeeEmail}</div>}
            </label>
            <br />
            <br />

            <label>
                Phone Number: <span style={{ color: 'red' }}>*</span>
                <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
            </label>
            <br />
            <br />

            <label>
                Department: <span style={{ color: 'red' }}>*</span>
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                {errors.department && <div style={{ color: 'red' }}>{errors.department}</div>}
            </label>
            <br />
            <br />

            <label>
                Date of Joining: <span style={{ color: 'red' }}>*</span>
                <input
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                />
                {errors.dateOfJoining && <div style={{ color: 'red' }}>{errors.dateOfJoining}</div>}
            </label>
            <br />
            <br />

            <label>
                Role: <span style={{ color: 'red' }}>*</span>
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                />
                {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
            </label>
            <br />
            <br />

            <button type="submit">Submit</button>
            <button type="button" onClick={() => {
                setFormData({
                    employeeName: '',
                    employeeID: '',
                    employeeEmail: '',
                    phoneNumber: '',
                    department: '',
                    dateOfJoining: '',
                    role: '',
                });
                setErrors({});
                setFeedbackMessage('');
            }} style={{ marginLeft: '10px' }}>
                Reset
            </button>

            <div style={{ marginTop: '10px', color: feedbackMessage.includes('success') ? 'green' : 'red' }}>
                {feedbackMessage}
            </div>
        </form>
    );
}
