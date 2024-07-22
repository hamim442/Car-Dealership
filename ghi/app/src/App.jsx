import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianList from "./components/TechnicianList";
import CreateTechnician from "./components/CreateTechnician";
import CreateServiceAppointment from "./components/CreateServiceAppointment";
import ListAppointments from "./components/ListAppointments";
import ServiceHistory from "./components/serviceHistory";
import ManufacturerList from "./components/ManufactureList";
import CreateManufacturer from "./components/createManufacturer";
import VehicleModelList from "./components/vehicleModelList";
import CreateVehicleModel from "./components/CreateVehicleModel";
import AutomobileList from "./components/AutomobileList";
import CreateAutomobile from "./components/CreateAutomobile";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/technicians" element={<TechnicianList />} />
					<Route path="/technicians/new" element={<CreateTechnician />} />
					<Route path="/appointments/new" element={<CreateServiceAppointment />} />
					<Route path="/appointments" element={< ListAppointments />} />
                    <Route path="/appointments/history" element={<ServiceHistory />} /> 
					<Route path="/manufactures" element={<ManufacturerList />} /> 
					<Route path="/manufactures/create" element={<CreateManufacturer />} /> 
					<Route path="/models" element={<VehicleModelList />} /> 
					<Route path="/models/create" element={<CreateVehicleModel />} /> 
					<Route path="/automobiles" element={<AutomobileList/>} /> 
					<Route path="/automobiles/create" element={<CreateAutomobile/>} /> 


                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;