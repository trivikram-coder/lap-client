import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function Home() {
  return (
    <div className="bg-light min-vh-100">

      {/* HERO SECTION */}

      <div className="bg-primary text-white py-5">
        <Container fluid className="px-5">

          <Row className="align-items-center gy-4">

            {/* LEFT */}

            <Col lg={6}>

              <h1 className="display-5 fw-bold">
                Check Your Loan Eligibility
              </h1>

              <p className="lead opacity-75 mt-3">
                Enter your details and instantly see whether
                your loan application may be approved.
              </p>

              <div className="mt-4 d-flex gap-3 flex-wrap">

                <Link to="/predict">
                  <Button
                    size="lg"
                    variant="light"
                    className="fw-semibold px-4 shadow-sm"
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

              <p className="small opacity-75 mt-3">
                You can also view all your previous loan checks anytime.
              </p>

            </Col>


            {/* RIGHT */}

            <Col lg={6}>

              <Card className="border-0 shadow-lg rounded-4">
                <Card.Body className="p-4">

                  <h5 className="fw-bold mb-3">
                    What this tool does
                  </h5>

                  <ul className="text-muted mb-0">
                    <li>Check if your loan may be approved</li>
                    <li>Understand the reasons behind the result</li>
                    <li>See important financial factors</li>
                    <li>Track all your past loan checks</li>
                  </ul>

                </Card.Body>
              </Card>

            </Col>

          </Row>

        </Container>
      </div>


      {/* FEATURES */}

      <Container className="py-5">

        <Row className="g-4 text-center">

          <Col md={4}>

            <Card className="border-0 shadow-sm rounded-4 h-100">

              <Card.Body className="p-4">

                <h5 className="fw-bold">
                  ⚡ Quick Results
                </h5>

                <p className="text-muted small">
                  Enter your details and get a result instantly.
                </p>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm rounded-4 h-100">

              <Card.Body className="p-4">

                <h5 className="fw-bold">
                  📊 Clear Explanation
                </h5>

                <p className="text-muted small">
                  See the factors that affect your loan approval.
                </p>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm rounded-4 h-100">

              <Card.Body className="p-4">

                <h5 className="fw-bold">
                  🗂 Check History
                </h5>

                <p className="text-muted small">
                  View your previous loan eligibility checks anytime.
                </p>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>


      {/* HISTORY CTA */}

      <Container className="pb-5">

        <Card className="border-0 shadow-sm rounded-4 text-center">

          <Card.Body className="p-4">

            <h5 className="fw-bold mb-2">
              Already checked your eligibility?
            </h5>

            <p className="text-muted small">
              View your previous results and analysis anytime.
            </p>

            <Link to="/history">
              <Button
                variant="primary"
                className="px-4 fw-semibold"
              >
                Go to History
              </Button>
            </Link>

          </Card.Body>

        </Card>

      </Container>

    </div>
  );
}