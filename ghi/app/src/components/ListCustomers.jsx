import React from "react";
import { useFetch } from "./hooks";

export default function CustomerList() {
  const { data, error } = useFetch(
    {customers: []},
    "http://localhost:8090/api/customers/"
  );
  if (error) {
    return <p>{error.message}</p>;
  }
  const customers = data.customers || [];

  return (
    <div>
      <h2>Customers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customers) => (
            <tr key={customers.id}>
              <td>{customers.first_name}</td>
              <td>{customers.last_name}</td>
              <td>{customers.phone_number}</td>
              <td>{customers.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
