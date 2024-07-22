import { useState } from "react";

function CreateCustomer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
    };

    console.log(data);

    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(customerUrl, fetchConfig);
      if (response.ok) {
        const newCustomer = await response.json();
        console.log(newCustomer);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setAddress("");
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                placeholder="First name..."
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <label htmlFor="first_name">First name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Last name..."
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <label htmlFor="last_name">Last name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Address..."
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <label htmlFor="address">Address...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Phone number..."
                required
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-control"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <label htmlFor="phone_number">Phone number...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
