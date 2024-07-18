import React, { useEffect, useState } from 'react';

const AddSale = () => {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedAutomobile, setSelectedAutomobile] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const automobilesResponse = await fetch('http://localhost:8090/api/automobiles/');
      const automobilesData = await automobilesResponse.json();
      setAutomobiles(automobilesData.filter(auto => !auto.sold));

      const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
      const salespeopleData = await salespeopleResponse.json();
      setSalespeople(salespeopleData);

      const customersResponse = await fetch('http://localhost:8090/api/customers/');
      const customersData = await customersResponse.json();
      setCustomers(customersData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8090/api/sales/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        automobile: selectedAutomobile,
        salesperson: selectedSalesperson,
        customer: selectedCustomer,
        price: price
      }),
    });
    if (response.ok) {
      alert('Sale recorded successfully');
    } else {
      alert('Error recording sale');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Automobile</label>
        <select value={selectedAutomobile} onChange={(e) => setSelectedAutomobile(e.target.value)} required>
          <option value="">Select an Automobile</option>
          {automobiles.map((auto) => (
            <option key={auto.id} value={auto.id}>{auto.vin}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Salesperson</label>
        <select value={selectedSalesperson} onChange={(e) => setSelectedSalesperson(e.target.value)} required>
          <option value="">Select a Salesperson</option>
          {salespeople.map((sp) => (
            <option key={sp.id} value={sp.id}>{sp.first_name} {sp.last_name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Customer</label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
          <option value="">Select a Customer</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>{cust.first_name} {cust.last_name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <button type="submit">Record Sale</button>
    </form>
  );
};

export default AddSale;
