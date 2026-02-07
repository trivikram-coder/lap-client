import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Loan Approval System
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#loanNavbar"
          aria-controls="loanNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="loanNavbar">
          <ul className="navbar-nav ms-auto text-center text-lg-start gap-lg-3 mt-3 mt-lg-0">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "active text-warning" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/predict"
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "active text-warning" : ""}`
                }
              >
                Apply Loan
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "active text-warning" : ""}`
                }
              >
                Applications
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}
