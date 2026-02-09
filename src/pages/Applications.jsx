import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Badge, Spinner, Alert, Card, Button } from "react-bootstrap";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const USE_API = false; // 🔁 set true when DB is ready

  useEffect(() => {
    USE_API ? fetchFromAPI() : fetchFromLocalStorage();
  }, []);

  /* ---------------- LOCAL STORAGE ---------------- */
  const fetchFromLocalStorage = () => {
    try {
      const data = JSON.parse(localStorage.getItem("loanApplications")) || [];
      setApplications(data);
    } catch {
      setError("Failed to load applications from local storage");
    } finally {
      setLoading(false);
    }
  };

  const deleteFromLocalStorage = (id) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    localStorage.setItem("loanApplications", JSON.stringify(updated));
  };

  /* ---------------- API (FUTURE) ---------------- */
  const fetchFromAPI = async () => {
    try {
      const res = await axios.get("http://localhost:3000/applications");
      setApplications(res.data);
    } catch {
      setError("Failed to load applications from server");
    } finally {
      setLoading(false);
    }
  };

  const deleteFromAPI = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/applications/${id}`);
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch {
      alert("Failed to delete application");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    USE_API ? deleteFromAPI(id) : deleteFromLocalStorage(id);
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">

          <h3 className="fw-bold mb-3">Loan Applications</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          {applications.length === 0 ? (
            <Alert variant="info">No loan applications found.</Alert>
          ) : (
            <Table striped hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Income</th>
                  <th>Loan Amount</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app.id || index}>
                    <td>{app.id}</td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td>₹ {app.income}</td>
                    <td>₹ {app.loanAmount}</td>
                    <td>
                      <Badge bg={app.status === "ELIGIBLE" ? "success" : "danger"}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

        </Card.Body>
      </Card>
    </Container>
  );
}
