import { Container, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <h2 className="fw-bold mb-3">About This Project</h2>

          <p className="text-muted">
            This Loan Approval Prediction System uses a
            <strong> Decision Tree Machine Learning model </strong>
            to determine loan eligibility based on applicant details
            such as income, credit history, education, and employment.
          </p>

          <p className="text-muted">
            The system follows a MERN-based architecture with a
            separate FastAPI-powered ML service for real-time predictions.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
