import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">

      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/home">
          Smart Loan Eligibility Predictor
        </Link>

        {/* MOBILE MENU */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#loanNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="loanNavbar">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/home">
                Dashboard
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/predict">
                Predict Loan
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/history">
                History
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/contact">
                Contact
              </Link>
            </li>

            {/* PROFILE DROPDOWN */}

            <li className="nav-item dropdown ms-3">

              <button
                className="btn btn-outline-primary dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                👤 {user.userName || "Profile"}
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">

                <li>
                  <span className="dropdown-item-text small text-muted">
                    {user.email}
                  </span>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/history">
                    Loan History
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    onClick={logout}
                    className="dropdown-item text-danger"
                  >
                    Logout
                  </button>
                </li>

              </ul>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}