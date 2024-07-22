import React, { useState, useEffect } from 'react';

export default function CreateVehicleModel() {
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8100/api/manufacturers/')
      .then(response => response.json())
      .then(data => setManufacturers(data.manufacturers));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, picture_url: pictureUrl, manufacturer_id: manufacturerId };

    const response = await fetch('http://localhost:8100/api/models/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setName('');
      setPictureUrl('');
      setManufacturerId('');
      alert('Vehicle model created successfully');
    } else {
      alert('Failed to create vehicle model');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6">
        <h2>Create a vehicle model</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Model name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="pictureUrl"
              placeholder="Picture URL..."
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              id="manufacturer"
              value={manufacturerId}
              onChange={(e) => setManufacturerId(e.target.value)}
              required
            >
              <option value="">Choose a manufacturer...</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}
