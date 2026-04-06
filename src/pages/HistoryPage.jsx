import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApplications, deleteApplication } from "../api/api";
import { toast } from "react-toastify";

export default function HistoryPage() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {

    const loadApplications = async () => {

      try {

        const res = await fetchApplications(user.id);

        setApplications(res.data.data);

      } catch (err) {

        console.error("Failed to load applications", err);

      } finally {

        setLoading(false);

      }

    };

    if (user?.id) {
      loadApplications();
    }

  }, [user.id]);


  /* DELETE APPLICATION */

  const handleDeleteApplication = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {

      await deleteApplication(id);

      /* update UI */

      setApplications(prev =>
        prev.filter(app => app._id !== id)
      );

    } catch (err) {

      console.error("Delete failed", err);

      toast.error("Failed to delete application");

    }

  };


  return (

    <div className="bg-light min-vh-100">

      {/* HEADER */}

      <div className="bg-dark text-white py-4 shadow-sm">

        <div className="container d-flex justify-content-between align-items-center">

          <h4 className="mb-0">Loan Application History</h4>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/predict")}
          >
            New Application
          </button>

        </div>

      </div>


      {/* CONTENT */}

      <div className="container py-5">

        {loading && (

          <div className="text-center">

            <div className="spinner-border text-primary"></div>

            <p className="mt-2">Loading applications...</p>

          </div>

        )}

        {!loading && applications.length === 0 && (

          <div className="alert alert-info text-center">

            No applications found. Submit a new loan request.

          </div>

        )}

        <div className="row g-4">

          {applications.map((app) => (

            <div key={app._id} className="col-md-6 col-lg-4">

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body">

                  {/* APPLICATION ID */}

                  <p className="text-muted small mb-2">
                    <strong>ID :</strong> {app._id}
                  </p>

                  <p>
                    <strong>Date :</strong>
                    {new Date(app.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
              </p>
                  {/* STATUS */}

                  <h6 className="fw-bold mb-2">

                    Status :

                    <span
                      className={
                        app.status === "ELIGIBLE"
                          ? "text-success ms-2"
                          : "text-danger ms-2"
                      }
                    >
                      {app.status}
                    </span>

                  </h6>

                  <hr />


                  <p className="mb-1">
                    <strong>CIBIL Score :</strong> {app.cibilScore}
                  </p>

                  <p className="mb-1">
                    <strong>Applicant Income :</strong> ₹{app.ApplicantIncome}
                  </p>

                  <p className="mb-1">
                    <strong>Loan Amount :</strong> ₹{app.LoanAmount}
                  </p>

                  <p className="mb-3">
                    <strong>Area :</strong> {app.area}
                  </p>


                  {/* BUTTONS */}

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-primary w-100"
                      onClick={() =>
                        navigate(`/application/${app._id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteApplication(app._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}