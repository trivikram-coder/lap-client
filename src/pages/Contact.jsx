import { Container, Card } from "react-bootstrap";

export default function Contact() {
  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <h2 className="fw-bold mb-3">Contact Us</h2>

          <p className="mb-1">
            <strong>Email:</strong> support@loanpredict.ai
          </p>

          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
