import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="bg-light min-vh-100">

      {/* HERO */}

      <div
        className="text-white py-5"
        style={{ background: "linear-gradient(135deg,#0d6efd,#4f9cff)" }}
      >
        <Container className="py-5">

          <Row className="align-items-center">

            <Col lg={6} className="mb-4 mb-lg-0">

              <h1 className="display-4 fw-bold mb-3">
                Smart Loan Eligibility
              </h1>

              <p className="fs-5 opacity-75 mb-4">
                Instantly check whether your loan application may be approved
                using an intelligent prediction system.
              </p>

              <div className="d-flex gap-3 flex-wrap">

                <Link to="/predict">
                  <Button
                    size="lg"
                    variant="light"
                    className="fw-semibold px-4 shadow"
                  >
                    Check Eligibility
                  </Button>
                </Link>

                <Link to="/history">
                  <Button
                    size="lg"
                    variant="outline-light"
                    className="fw-semibold px-4"
                  >
                    View History
                  </Button>
                </Link>

              </div>

            </Col>

            {/* RIGHT SIDE INFO */}

            <Col lg={6} className="text-center">

              <div className="bg-white text-dark rounded-4 shadow p-4">

                <h5 className="fw-bold mb-3">
                  Loan Prediction System
                </h5>

                <p className="text-muted small mb-0">
                  Our system analyzes financial details and predicts
                  loan eligibility instantly using a machine learning model.
                </p>

              </div>

            </Col>

          </Row>

        </Container>
      </div>


      {/* FEATURES */}

      <Container className="py-5">

        <Row className="g-4 text-center">

          <Col md={4}>
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <h5 className="fw-bold">⚡ Instant Results</h5>
              <p className="text-muted small mb-0">
                Get loan eligibility prediction immediately.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <h5 className="fw-bold">📊 Financial Insights</h5>
              <p className="text-muted small mb-0">
                Understand which financial factors influence approval.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <h5 className="fw-bold">🗂 Application History</h5>
              <p className="text-muted small mb-0">
                Track all your previous loan eligibility checks.
              </p>
            </div>
          </Col>

        </Row>

      </Container>

    </div>
  );
}