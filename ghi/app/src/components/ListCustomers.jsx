import React, { useEffect, useState } from 'react';

const ListCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8090/api/customers/');
      const data = await response.json();
      setCustomers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.first_name} {customer.last_name} (Address: {customer.address}, Phone: {customer.phone_number})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCustomers;
