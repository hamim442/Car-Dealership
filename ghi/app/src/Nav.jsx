import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"> 
              <NavLink className="nav-link" to="/technicians"> Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians/new">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/new">Create a Service appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/history">Service History</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufactures">Manufactures</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufactures/create">Create a manufacture</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models">Models</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models/create">Create a Models</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/create">Create anAutomobiles</NavLink> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
