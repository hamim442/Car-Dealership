import React, { useState, useEffect } from 'react';

export default function CreateAutomobile() {
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [modelId, setModelId] = useState('');
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8100/api/models/')
      .then(response => response.json())
      .then(data => setModels(data.models));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { color, year, vin, model_id: modelId };

    const response = await fetch('http://localhost:8100/api/automobiles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setColor('');
      setYear('');
      setVin('');
      setModelId('');
      alert('Automobile added successfully');
    } else {
      alert('Failed to add automobile');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-6">
        <h2>Add an automobile to inventory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="color"
              placeholder="Color..."
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="year"
              placeholder="Year..."
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="vin"
              placeholder="VIN..."
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              id="model"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              required
            >
              <option value="">Choose a model...</option>
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
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
