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
import AddSale from "./components/AddSale";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/salespeople" element={<ListSalespeople />} />
                    <Route path="/salesperson/new" element={<CreateSalesperson />} />
                    <Route path="/customers" element={<ListCustomers />} />
                    <Route path="/customer/new" element={<AddCustomer />} />
                    <Route path="/sales/record" element={<RecordSale />} />
                    <Route path="/sales" element={<ListSales />} />
                    <Route path="/sales/history" element={<SalespersonHistory />} />
					<Route path="/addsales" element={<RecordSale/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;



























// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainPage from "./MainPage";
// import Nav from "./Nav";
// import CreateSalesperson from "./components/CreateSalesperson";
// import ListSalespeople from "./components/ListSalespeople";
// import AddCustomer from "./components/AddCustomer";
// import ListCustomers from "./components/ListCustomers";
// import RecordSale from "./components/RecordSale";
// import AddSale from "./components/AddSale";
// import SalespersonHistory from "./components/SalespersonHistory";
// // import AddSale from "./components/AddSale";
// // import ListSales from "./components/ListSales";
// // import SalespersonHistory from "./components/SalespersonHistory";

// function App() {
// 	return (
// 		<BrowserRouter>
// 			<Nav />
// 			<div className="container">
// 				<Routes>
// 					<Route path="/" element={<MainPage />} />
// 					<Route path="/salespeople" element={<ListSalespeople />} />
// 					<Route path="/salespeople/new" element={<CreateSalesperson />} />
// 					<Route path="/customers" element={<ListCustomers />} />
// 					<Route path="/customer/new" element={<AddCustomer />} />
// 					<Route path="/sales/record" element={<RecordSale />} />
// 					<Route path="/sales" element={<AddSale/>} />
// 					<Route path="/sales/history" element={<SalespersonHistory />} />
// 					<Route path="/addsale" element={<AddSale/>} />
// 					{/* <Route path="/add-salesperson" element={<AddSalesperson />} />
// 					<Route path="/salespeople" element={<ListSalespeople />} />
// 					<Route path="/add-customer" element={<AddCustomer />} />
// 					<Route path="/customers" element={<ListCustomers />} />
// 					<Route path="/add-sale" element={<AddSale />} />
// 					<Route path="/sales" element={<ListSales />} />
// 					<Route path="/salesperson-history" element={<SalespersonHistory />} />
// 					<Route path="/record-sale" element={<RecordSale />} /> */}
// 				</Routes>
// 			</div>
// 		</BrowserRouter>
// 	);
// }

// export default App;
