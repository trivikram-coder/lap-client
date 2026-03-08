import { Container, Card, Row, Col } from "react-bootstrap";

export default function Contact() {

  return (

    <div className="bg-light min-vh-100 py-5">

      <Container>

        <Row className="justify-content-center">

          <Col lg={6}>

            <Card className="shadow-lg border-0 rounded-4">

              <Card.Body className="p-5 text-center">

                <h3 className="fw-bold mb-3">
                  Contact Support
                </h3>

                <p className="text-muted mb-4">
                  Have questions about loan prediction?
                  Reach out to our team.
                </p>

                <p className="mb-2">
                  📧 <strong>Email:</strong> support@loanpredict.ai
                </p>

                <p>
                  📞 <strong>Phone:</strong> +91 7396046249
                </p>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>
  );
}