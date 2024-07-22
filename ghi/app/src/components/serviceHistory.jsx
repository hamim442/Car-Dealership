import React, { useState, useEffect } from 'react';
import { useFetch } from './hooks';

export default function ServiceHistory() {
  const { data, error } = useFetch(
    { appointments: [] },
    "http://localhost:8080/api/appointment/"
  );
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    if (data.appointments) {
      setAppointments(data.appointments);
      setFilteredAppointments(data.appointments);
    }
  }, [data]);

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = appointments.filter(appointment =>
      appointment.vin.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  return (
    <div>
      <h2>Service History</h2>
      <form className="mb-4" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by VIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success">Search</button>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
              <td>{appointment.customer}</td>
              <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
              <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
