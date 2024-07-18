import React, { useState } from 'react';

const AddSalesperson = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8090/api/salespeople/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, employee_id: employeeId }),
    });
    if (response.ok) {
      alert('Salesperson added successfully');
    } else {
      alert('Error adding salesperson');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Employee ID</label>
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
      </div>
      <button type="submit">Add Salesperson</button>
    </form>
  );
};

export default AddSalesperson;
