import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AddSalesperson from "./components/AddSalesperson";
import ListSalespeople from "./components/ListSalespeople";
import AddCustomer from "./components/AddCustomer";
import ListCustomers from "./components/ListCustomers";
import AddSale from "./components/AddSale";
import ListSales from "./components/ListSales";
import SalespersonHistory from "./components/SalespersonHistory";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/add-salesperson" element={<AddSalesperson />} />
					<Route path="/salespeople" element={<ListSalespeople />} />
					<Route path="/add-customer" element={<AddCustomer />} />
					<Route path="/customers" element={<ListCustomers />} />
					<Route path="/add-sale" element={<AddSale />} />
					<Route path="/sales" element={<ListSales />} />
					<Route path="/salesperson-history" element={<SalespersonHistory />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
