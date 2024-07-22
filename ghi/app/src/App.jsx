import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import CreateSalesperson from "./components/CreateSalesperson";
import ListSalespeople from "./components/ListSalespeople";
import AddCustomer from "./components/AddCustomer";
import ListCustomers from "./components/ListCustomers";
import RecordSale from "./components/RecordSale";
import ListSales from "./components/ListSales";
import SalespersonHistory from "./components/SalespersonHistory";
import TechnicianList from "./components/TechnicianList";
import CreateTechnician from "./components/CreateTechnician";
import CreateServiceAppointment from "./components/CreateServiceAppointment";
import ListAppointments from "./components/ListAppointments";
import ServiceHistory from "./components/serviceHistory";
import ManufacturerList from "./components/manufactureList";
import CreateManufacturer from "./components/createManufacturer";
import VehicleModelList from "./components/VehicleModelList";
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
					<Route path="/salespeople" element={<ListSalespeople />} />
					<Route path="/salespeople/new" element={<CreateSalesperson />} />
					<Route path="/customers" element={<ListCustomers />} />
					<Route path="/customer/new" element={<AddCustomer />} />
					<Route path="/sales/record" element={<RecordSale />} />
					<Route path="/sales" element={<ListSales />} />
					<Route path="/sales/history" element={<SalespersonHistory />} />
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
