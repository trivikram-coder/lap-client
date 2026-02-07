import { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";

export default function Predict() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const f = e.target;

    const payload = {
      gender: f.gender.value,
      married: f.married.value,
      dependents: f.dependents.value,
      education: f.education.value,
      employed: f.employed.value,
      credit: Number(f.credit.value),
      area: f.area.value,
      ApplicantIncome: Number(f.applicantIncome.value),
      CoapplicantIncome: Number(f.coIncome.value),
      LoanAmount: Number(f.loanAmount.value),
      Loan_Amount_Term: Number(f.loanTerm.value),
    };

    try {
      const res = await axios.post("https://lap-server.onrender.com/predict", payload);
      setResult(res.data);
      const existing =
  JSON.parse(localStorage.getItem("loanApplications")) || [];

existing.push({
  id: Date.now(),
  status: res.data.status,
  income: payload.ApplicantIncome,
  loanAmount: payload.LoanAmount,
  createdAt: new Date().toISOString(),
});

localStorage.setItem(
  "loanApplications",
  JSON.stringify(existing)
);

    } catch {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-primary bg-gradient py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={7}>

            {/* RESULT */}
            {result && (
              <Alert
                variant={result.status === "ELIGIBLE" ? "success" : "warning"}
                className="text-center fw-bold shadow-sm"
              >
                <h5>{result.message}</h5>
                {result.reasons?.length > 0 && (
                  <ul className="text-start mt-2">
                    {result.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </Alert>
            )}

            {/* CARD */}
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">

                <h3 className="text-center fw-bold mb-4">
                  Loan Approval Prediction
                </h3>

                <Form onSubmit={handleSubmit}>

                  {/* Gender */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Gender</Form.Label>
                    <Form.Select name="gender" required>
                      <option value="">-- Select Gender --</option>
                      <option>Male</option>
                      <option>Female</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Marital */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Marital Status</Form.Label>
                    <Form.Select name="married">
                      <option value="">-- Select Marital Status --</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Dependents */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Dependents</Form.Label>
                    <Form.Select name="dependents">
                      <option value="">-- Select Dependents --</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3+</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Education */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Education</Form.Label>
                    <Form.Select name="education">
                      <option value="">-- Select Education --</option>
                      <option>Graduate</option>
                      <option>Not Graduate</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Employment */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Self Employed</Form.Label>
                    <Form.Select name="employed">
                      <option value="">-- Select Employment --</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Credit */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Credit History
                    </Form.Label>
                    <Form.Select name="credit" required>
                      <option value="">-- Select Credit History --</option>
                      <option value="1">Good (1)</option>
                      <option value="0">Bad (0)</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Income */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Applicant Income
                    </Form.Label>
                    <Form.Control type="number" name="applicantIncome" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Co-applicant Income
                    </Form.Label>
                    <Form.Control type="number" name="coIncome" />
                  </Form.Group>

                  {/* Loan */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Loan Amount</Form.Label>
                    <Form.Control type="number" name="loanAmount" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      Loan Amount Term
                    </Form.Label>
                    <Form.Control type="number" name="loanTerm" />
                  </Form.Group>

                  {/* Area */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Property Area</Form.Label>
                    <Form.Select name="area">
                      <option value="">-- Select Area --</option>
                      <option>Urban</option>
                      <option>Semiurban</option>
                      <option>Rural</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Button */}
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 fw-bold py-3 rounded-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Predicting...
                      </>
                    ) : (
                      "Predict Loan Approval"
                    )}
                  </Button>

                </Form>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  );
}
