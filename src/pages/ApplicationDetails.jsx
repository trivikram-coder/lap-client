import { useEffect, useState } from "react";
import {getApplicationById} from "../api/api"
import { useParams, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ApplicationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchApplication = async () => {

      try {

        const res = await getApplicationById(id);

        setData(res.data.data);

      } catch (err) {

        console.error("Failed to fetch application", err);

      } finally {

        setLoading(false);

      }

    };

    fetchApplication();

  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading application...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Application not found
        </div>
      </div>
    );
  }

  /* ------------------------------
     FACTOR ANALYSIS
  ------------------------------ */

  const factors = [
    {
      label: "CIBIL Score",
      value: data.cibilScore,
      good: data.cibilScore >= 700,
      goodText: "Strong credit score",
      badText: "Low credit score"
    },
    {
      label: "Applicant Income",
      value: `₹${data.ApplicantIncome}`,
      good: data.ApplicantIncome >= 50000,
      goodText: "High applicant income",
      badText: "Low applicant income"
    },
    {
      label: "Education",
      value: data.education,
      good: data.education === "Graduate",
      goodText: "Graduate education",
      badText: "Lower education level"
    },
    {
      label: "Employment",
      value: data.employed,
      good: data.employed === "Yes",
      goodText: "Stable employment",
      badText: "Employment stability is low"
    },
    {
      label: "Loan Amount",
      value: `₹${data.LoanAmount}`,
      good: data.LoanAmount <= data.ApplicantIncome * 0.4,
      goodText: "Loan amount is reasonable",
      badText: "Loan amount too high compared to income"
    }
  ];

  const goodReasons = factors.filter(f => f.good).map(f => f.goodText);
  const badReasons = factors.filter(f => !f.good).map(f => f.badText);

  /* ------------------------------
     PIE DATA
  ------------------------------ */

  const pieData = [
    { name: "Good Factors", value: goodReasons.length },
    { name: "Risk Factors", value: badReasons.length }
  ];

  const pieColors = ["#28a745", "#dc3545"];

  return (

    <div className="bg-light min-vh-100">

      {/* HEADER */}

      <div className="bg-dark text-white py-3 shadow-sm">

        <div className="container d-flex justify-content-between align-items-center">

          <h5 className="mb-0">Application Analysis</h5>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/history")}
          >
            Back
          </button>

        </div>

      </div>


      <div className="container py-4">

        {/* APPLICANT DETAILS */}

        <div className="card shadow border-0 mb-4">

          <div className="card-body">

            <h5 className="fw-bold mb-3">Applicant Details</h5>

            <div className="row">

              <div className="col-md-4">
                <p><strong>Gender:</strong> {data.gender}</p>
                <p><strong>Married:</strong> {data.married}</p>
                <p><strong>Dependents:</strong> {data.dependents}</p>
              </div>

              <div className="col-md-4">
                <p><strong>Education:</strong> {data.education}</p>
                <p><strong>Employment:</strong> {data.employed}</p>
                <p><strong>Area:</strong> {data.area}</p>
              </div>

              <div className="col-md-4">
                <p><strong>CIBIL:</strong> {data.cibilScore}</p>
                <p><strong>Income:</strong> ₹{data.ApplicantIncome}</p>
                <p><strong>Loan:</strong> ₹{data.LoanAmount}</p>
              </div>

            </div>

            <hr />

            <h6>
              Status:
              <span
                className={
                  data.status === "ELIGIBLE"
                    ? "text-success ms-2"
                    : "text-danger ms-2"
                }
              >
                {data.status}
              </span>
            </h6>

          </div>

        </div>
        
        {/* REASONS */}

        <div className="row mt-4">

          <div className="col-md-6">

            <div className="card border-success shadow-sm">

              <div className="card-body">

                <h6 className="text-success fw-bold">
                  Good Factors
                </h6>

                <ul>

                  {goodReasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}

                </ul>

              </div>

            </div>

          </div>


          <div className="col-md-6">

            <div className="card border-danger shadow-sm">

              <div className="card-body">

                <h6 className="text-danger fw-bold">
                  Risk Factors
                </h6>

                <ul>

                  {badReasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}

                </ul>

              </div>

            </div>

          </div>

        </div>
        {/* PIE CHART */}

        <div className="card shadow border-0 mb-4">

          <div className="card-body">

            <h6 className="fw-bold text-center mb-3">
              Risk Overview
            </h6>

            <ResponsiveContainer width="100%" height={260}>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index]}
                    />
                  ))}

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* FACTOR DASHBOARD */}

        <div className="row g-3">

          {factors.map((factor, index) => (

            <div key={index} className="col-md-4 col-lg-3">

              <div
                className={`card shadow-sm border-0 text-center ${
                  factor.good
                    ? "bg-success text-white"
                    : "bg-danger text-white"
                }`}
              >

                <div className="card-body">

                  <h6 className="fw-bold">
                    {factor.label}
                  </h6>

                  <p className="mb-1">
                    {factor.value}
                  </p>

                  <small>
                    {factor.good
                      ? factor.goodText
                      : factor.badText}
                  </small>

                </div>

              </div>

            </div>

          ))}

        </div>



      </div>

    </div>

  );

}