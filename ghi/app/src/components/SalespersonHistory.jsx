import React, { useState, useEffect } from 'react';
export default function SalespersonHistory() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch('http://localhost:8090/api/sales/')
      .then(response => response.json())
      .then(data => {
        setSales(data.sales);
        setFilteredSales(data.sales);
      });
  }, []);
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    const filtered = sales.filter(sale =>
      sale.salesperson.first_name.toLowerCase().includes(value.toLowerCase()) ||
      sale.salesperson.last_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSales(filtered);
  };
  return (
    <div>
      <h2>Salesperson History</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by salesperson..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
              <td>{sale.customer.first_name} {sale.customer.last_name}</td>
              <td>{sale.automobile.vin}</td>
              <td>${sale.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
