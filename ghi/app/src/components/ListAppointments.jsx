import React, { useState, useEffect } from 'react';
import { useFetch } from './hooks';

export default function ListAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { data, error } = useFetch(
    { appointments: [] },
    "http://localhost:8080/api/appointment/"
  );

  useEffect(() => {
    if (data.appointments) {
      // Filter out appointments with status "canceled" or "finished"
      const filteredAppointments = data.appointments.filter(
        (appointment) => appointment.status !== 'canceled' && appointment.status !== 'finished'
      );
      setAppointments(filteredAppointments);
    }
  }, [data]);

  if (error) {
    return <p>{error.message}</p>;
  }

  async function updateAppointmentStatus(id, status) {
    const url = `http://localhost:8080/api/appointment/${id}/${status}/`;
    const fetchConfig = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      // Refetch the data after updating the status
      const updatedResponse = await fetch("http://localhost:8080/api/appointment/");
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        // Filter out appointments with status "canceled" or "finished"
        const filteredAppointments = updatedData.appointments.filter(
          (appointment) => appointment.status !== 'canceled' && appointment.status !== 'finished'
        );
        setAppointments(filteredAppointments);
      } else {
        console.error("Failed to refetch appointments");
      }
    } else {
      console.error(`Failed to update status to ${status}`);
    }
  }

  return (
    <div>
      <h2>Service Appointments</h2>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
              <td>{appointment.customer}</td>
              <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
              <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>
                <button onClick={() => updateAppointmentStatus(appointment.id, 'cancel')} className="btn btn-danger">Cancel</button>
                <button onClick={() => updateAppointmentStatus(appointment.id, 'finish')} className="btn btn-success">Finish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
