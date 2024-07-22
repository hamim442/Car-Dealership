import React, { useState } from 'react';

export default function CreateManufacturer() {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name };

    const response = await fetch('http://localhost:8100/api/manufacturers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setName('');
      console.log('Manufacturer created successfully');
    } else {
      console.log('Failed to create manufacturer');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6">
        <h2>Create a manufacturer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Manufacturer name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}
