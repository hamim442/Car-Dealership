import React, {useState } from "react"

function CreateTechnician() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            employee_id: employeeId
        };

        const technicianUrl = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch(technicianUrl, fetchConfig);
            if (response.ok) {
                const newTechnician = await response.json();
                console.log(newTechnician);
                setFirstName("");
                setLastName("");
                setEmployeeId("");
            } else {
                console.error(`Error: ${response.status}  ${response.statusText}`)
            }
        } catch (error) {
            console.error("Fetch error", error)
        }
    }

    return (
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="shadow p-4 mt-4">
            <h1 className="text-center">Add a Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-group mb-3">
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
              </div>
              <div className="form-group mb-3">
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
              </div>
              <div className="form-group mb-3">
                <input
                  placeholder="Employee ID..."
                  required
                  type="text"
                  name="employee_id"
                  id="employee_id"
                  className="form-control"
                  onChange={(e) => setEmployeeId(e.target.value)}
                  value={employeeId}
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Create</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      );
    }
    
    export default CreateTechnician;