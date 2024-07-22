import React, { useState } from 'react';
import { useFetch } from './hooks';
function RecordSales() {
  const { data: automobilesData } = useFetch(
    {
      automobiles: [],
    },
    'http://localhost:8090/api/automobiles/unsold/'
  );
  const { data: salespeopleData } = useFetch(
    {
      salespeople: [],
    },
    'http://localhost:8090/api/salespeople/'
  );
  const { data: customersData } = useFetch(
    {
      customers: [],
    },
    'http://localhost:8090/api/customers/'
  );
  const [automobile, setAutomobile] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      automobile: automobile,
      salesperson: salesperson,
      customer: customer,
      price: price,
    };
    const salesUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(salesUrl, fetchConfig);
      if (response.ok) {
        const newSale = await response.json();
        console.log(newSale);
        setAutomobile('');
        setSalesperson('');
        setCustomer('');
        setPrice('');
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="record-sale-form">
            <div className="mb-3">
              <select
                required
                name="automobile"
                id="automobile"
                className="form-select"
                onChange={(e) => setAutomobile(e.target.value)}
                value={automobile}
              >
                <option value="">Choose an automobile VIN...</option>
                {automobilesData.automobiles.map((auto) => (
                  <option key={auto.id} value={auto.id}>
                    {auto.vin}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
                onChange={(e) => setSalesperson(e.target.value)}
                value={salesperson}
              >
                <option value="">Choose a salesperson...</option>
                {salespeopleData.salespeople.map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.first_name} {sp.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                name="customer"
                id="customer"
                className="form-select"
                onChange={(e) => setCustomer(e.target.value)}
                value={customer}
              >
                <option value="">Choose a customer...</option>
                {customersData.customers.map((cust) => (
                  <option key={cust.id} value={cust.id}>
                    {cust.first_name} {cust.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RecordSales;
