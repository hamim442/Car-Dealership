import React, { useEffect, useState } from 'react';

const ListSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8090/api/sales/');
      const data = await response.json();
      setSales(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Sales</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            Automobile VIN: {sale.automobile}, Salesperson: {sale.salesperson}, Customer: {sale.customer}, Price: ${sale.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSales;
