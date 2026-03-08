
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  Card
} from "react-bootstrap";
import { predictLoan } from "../api/api";
import { toast } from "react-toastify";

export default function PredictPage() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cibilLabel, setCibilLabel] = useState(null);

  const requiredStar = <span className="text-danger">*</span>;

  const handleCibilChange = (e) => {
    const score = Number(e.target.value);

    if (!score) {
      setCibilLabel(null);
      return;
    }

    if (score >= 750) {
      setCibilLabel({ text: "Excellent Credit Score", variant: "success" });
    } else if (score >= 650) {
      setCibilLabel({ text: "Average Credit Score", variant: "warning" });
    } else {
      setCibilLabel({ text: "Poor Credit Score", variant: "danger" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const f = e.target;

    const payload = {
      userId: user.id,
      gender: f.gender.value,
      married: f.married.value,
      dependents: f.dependents.value,
      education: f.education.value,
      employed: f.employed.value,
      cibilScore: Number(f.cibilScore.value),
      area: f.area.value,
      ApplicantIncome: Number(f.applicantIncome.value),
      CoapplicantIncome: Number(f.coIncome.value),
      LoanAmount: Number(f.loanAmount.value),
      Loan_Amount_Term: Number(f.loanTerm.value)
    };

    try {

      const res = await predictLoan(payload);
      setResult(res.data);

    } catch {
      toast.error("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="bg-light min-vh-100">

      {/* HERO */}
      <div className="bg-primary text-white py-5 shadow-sm">
        <Container>
          <h2 className="fw-bold">Smart Loan Eligibility Predictor</h2>
          <p className="opacity-75 mb-0">
            Instantly check your loan approval chances
          </p>

          <Button
            variant="light"
            className="mt-3"
            onClick={() => navigate("/history")}
          >
            View Application History
          </Button>

        </Container>
      </div>

      <Container className="py-5">

        <Row className="g-4">

          {/* FORM */}
          <Col lg={7}>

            <Card className="border-0 shadow-lg rounded-4">
              <Card.Body className="p-4 p-lg-5">

                <h5 className="fw-bold mb-2">
                  Applicant Information
                </h5>

                <p className="text-muted small mb-4">
                  Fields marked with <span className="text-danger">*</span> are required.
                </p>

                <Form onSubmit={handleSubmit}>

                  <Row className="g-3">

                    <Col md={6}>
                      <Form.Label>
                        Gender {requiredStar}
                      </Form.Label>

                      <Form.Select name="gender" required>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Marital Status {requiredStar}
                      </Form.Label>

                      <Form.Select name="married" required>
                        <option value="">Select</option>
                        <option value="married">Married</option>
                        <option value="single">Single</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Dependents {requiredStar}
                      </Form.Label>

                      <Form.Select name="dependents" required>
                        <option value="">Select</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3+</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Education {requiredStar}
                      </Form.Label>

                      <Form.Select name="education" required>
                        <option value="">Select</option>
                        <option>Graduate</option>
                        <option>Not Graduate</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Self Employed {requiredStar}
                      </Form.Label>

                      <Form.Select name="employed" required>
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        CIBIL Score {requiredStar}
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="cibilScore"
                        min="300"
                        max="900"
                        required
                        onChange={handleCibilChange}
                      />

                      {cibilLabel && (
                        <small className={`text-${cibilLabel.variant}`}>
                          {cibilLabel.text}
                        </small>
                      )}
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Applicant Income {requiredStar}
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="applicantIncome"
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Co-applicant Income
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="coIncome"
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Loan Amount {requiredStar}
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="loanAmount"
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label>
                        Loan Term (months) {requiredStar}
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="loanTerm"
                        required
                      />
                    </Col>

                    <Col md={12}>
                      <Form.Label>
                        Property Area {requiredStar}
                      </Form.Label>

                      <Form.Select name="area" required>
                        <option value="">Select</option>
                        <option>Urban</option>
                        <option>Semiurban</option>
                        <option>Rural</option>
                      </Form.Select>
                    </Col>

                  </Row>

                  <Button
                    type="submit"
                    className="w-100 mt-4 py-3 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Predicting...
                      </>
                    ) : (
                      "Check Eligibility"
                    )}
                  </Button>

                </Form>

              </Card.Body>
            </Card>

          </Col>

          {/* RESULT */}
          <Col lg={5}>

            <Card className="border-0 shadow-lg rounded-4 h-100">
              <Card.Body className="p-4">

                <h5 className="fw-bold mb-4">
                  Prediction Result
                </h5>

                {!result && (
                  <p className="text-muted">
                    Submit the form to see loan eligibility prediction.
                  </p>
                )}

                {result && (
                  <Alert
                    variant={result.status === "ELIGIBLE" ? "success" : "danger"}
                  >
                    <h6 className="fw-bold">
                      {result.message}
                    </h6>

                    {result.reasons?.length > 0 && (
                      <ul className="small mt-2">
                        {result.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}

                  </Alert>
                )}

              </Card.Body>
            </Card>

          </Col>

        </Row>

      </Container>

    </div>
  );
}
