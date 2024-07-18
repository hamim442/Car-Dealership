import React, { useEffect, useState } from 'react';

const ListSalespeople = () => {
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8090/api/salespeople/');
      const data = await response.json();
      setSalespeople(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Salespeople</h2>
      <ul>
        {salespeople.map((salesperson) => (
          <li key={salesperson.id}>
            {salesperson.first_name} {salesperson.last_name} (ID: {salesperson.employee_id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSalespeople;
