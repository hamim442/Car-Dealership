import React from "react";
import { useFetch } from "./hooks";

export default function AutomobileList() {
    const { data, error } = useFetch(
        { autos: [] },
        "http://localhost:8100/api/automobiles/"
    );

    if (error) {
        return <p>{error.message}</p>;
    }

    const automobiles = data.autos || [];

    return (
        <div>
            <h2>Automobiles</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map((automobile) => (
                        <tr key={automobile.vin}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.model.manufacturer.name}</td>
                            <td>{automobile.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
