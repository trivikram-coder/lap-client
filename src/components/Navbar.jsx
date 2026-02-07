import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        Loan Approval System
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#loanNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="loanNavbar">
        <ul className="navbar-nav ms-auto gap-3">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/predict">
              Apply Loan
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/applications">
              Applications
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
