import React from "react";
import { useFetch } from "./hooks"; 

export default function TechnicianList() {
    const { data, error } = useFetch(
        { 
            technician: []
        },
        "http://localhost:8080/api/technicians/"
    );

    if (error) {
        return <p>{error.message}</p>;
    }

    const technicians = data.technician || [];

    return (
        <div>
          <h2>Technicians</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.id}>
                  <td>{technician.employee_id}</td>
                  <td>{technician.first_name}</td>
                  <td>{technician.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }