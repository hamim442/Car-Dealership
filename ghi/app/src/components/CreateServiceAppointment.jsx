import React, { useState } from "react";
import { useFetch } from "./hooks";

function CreateServiceAppointment() {
  const { data } = useFetch(
    {
      technicians: [],
    },
    "http://localhost:8080/api/technicians/"
  ); // this is for getting the technicians
  
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [technician, setTechnician] = useState("");
  const [reason, setReason] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const requestData = {
      vin: vin,
      customer: customer,
      date_time: `${date}T${time}`,
      technician: technician,
      reason: reason,
      status: "created",
    };

    const appointmentUrl = "http://localhost:8080/api/appointment/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        const newAppointment = await response.json();
        console.log(newAppointment);
        setVin("");
        setCustomer("");
        setDate("");
        setTime("");
        setTechnician("");
        setReason("");
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  const technicianList = data.technician || [];

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="create-service-appointment-form">
            <div className="form-floating mb-3">
              <input
                placeholder="Automobile VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
                onChange={(e) => setVin(e.target.value)}
                value={vin}
              />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
                onChange={(e) => setCustomer(e.target.value)}
                value={customer}
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Time"
                required
                type="time"
                name="time"
                id="time"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="mb-3">
              <select
                required
                name="technician"
                id="technician"
                className="form-select"
                onChange={(e) => setTechnician(e.target.value)}
                value={technician}
              >
                <option value="">Choose a technician...</option>
                {technicianList.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.first_name} {tech.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateServiceAppointment;
