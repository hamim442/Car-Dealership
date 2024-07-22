import React from "react";
import { useFetch } from "./hooks";

export default function VehicleModelList() {
    const { data, error } = useFetch(
        { models: [] },
        "http://localhost:8100/api/models/"
    );

    if (error) {
        return <p>{error.message}</p>;
    }

    const models = data.models || [];

    return (
        <div>
            <h2>Models</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td>
                                <img src={model.picture_url} alt={model.name} style={{ width: "200px" }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
