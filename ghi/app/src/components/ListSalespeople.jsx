import { useFetch } from "./hooks";

export default function SalespeopleList() {
  const { data, error } = useFetch(
    {salespeople: []},
    "http://localhost:8090/api/salespeople/"
  );
  if (error) {
    return <p>{error.message}</p>;
  }
  const salespeople = data.salespeople || [];

  return (
    <div>
      <h2>Salespeople</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople.map((salespeople) => (
            <tr key={salespeople.id}>
              <td>{salespeople.employee_id}</td>
              <td>{salespeople.first_name}</td>
              <td>{salespeople.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
