import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function Home() {
  return (
    <div className="bg-light py-5 min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="align-items-center">

          {/* LEFT CONTENT */}
          <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
            <h1 className="fw-bold display-5">
              Smart Loan Approval Prediction
            </h1>

            <p className="text-muted fs-5 mt-3">
              Predict loan eligibility instantly using Machine Learning
              based on applicant financial and personal details.
            </p>

            <p className="text-secondary">
              Tech Stack: React • Node.js • FastAPI • Machine Learning
            </p>

            <Link to="/predict">
              <Button
                variant="success"
                size="lg"
                className="mt-3 px-5 fw-bold"
              >
                Apply for Loan
              </Button>
            </Link>
          </Col>

          {/* RIGHT CARD */}
          <Col md={6}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Why use this system?</h4>
                <ul className="fs-6">
                  <li>Instant loan eligibility prediction</li>
                  <li>ML-powered decision making</li>
                  <li>Transparent approval reasons</li>
                  <li>Bank-style evaluation logic</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
}
