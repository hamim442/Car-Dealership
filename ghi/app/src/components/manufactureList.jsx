import React from "react";
import { useFetch } from "./hooks";

export default function ManufacturerList() {
    const { data, error } = useFetch(
        { manufacturers: [] },
        "http://localhost:8100/api/manufacturers/"
    );

    if (error) {
        return <p>{error.message}</p>;
    }

    const manufacturers = data.manufacturers || [];

    return (
        <div>
          <h2>Manufacturers</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map((manufacturer) => (
                <tr key={manufacturer.id}>
                  <td>{manufacturer.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}
