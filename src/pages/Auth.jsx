import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";
import { toast } from "react-toastify";

export default function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    userName: "",
    mobileNumber: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({
      userName: "",
      mobileNumber: "",
      email: "",
      password: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isLogin) {

        const res = await loginUser(
          {
            email: form.email,
            password: form.password
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login Successful")
        navigate("/home");

      } else {

        await registerUser(
          form
        );

        toast.success("Registered Successfully");
        setIsLogin(true);

      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="w-100 border-0 shadow-lg rounded-4" style={{ maxWidth: "440px" }}>
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="badge rounded-pill text-bg-primary px-3 py-2 mb-3">
                Smart Loan Eligibilty Prediction App
              </div>

              <h3 className="fw-bold mb-1">{isLogin ? "Login" : "Register"}</h3>
              <p className="text-muted mb-0">
                {isLogin ? "Sign in to continue" : "Create a new account"}
              </p>
            </div>

            <Form onSubmit={handleSubmit} className="d-grid gap-3">
              {!isLogin && (
                <>
                  <Form.Control
                    className="py-2"
                    placeholder="Username"
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control
                    className="py-2"
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <Form.Control
                className="py-2"
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Form.Control
                className="py-2"
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <Button className="w-100 py-2 fw-semibold shadow-sm" type="submit" variant="primary">
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form>

            {isLogin && (
              <div className="text-center mt-3">
                <Link to="/forgot-password" className="text-decoration-none fw-medium">
                  Forgot Password?
                </Link>
              </div>
            )}

            <div className="text-center mt-4 pt-3 border-top">
              {isLogin ? (
                <p className="mb-0 text-muted">
                  Don't have an account?{" "}
                  <span className="text-primary fw-semibold" style={{ cursor: "pointer" }} onClick={toggleMode}>
                    Register
                  </span>
                </p>
              ) : (
                <p className="mb-0 text-muted">
                  Already have an account?{" "}
                  <span className="text-primary fw-semibold" style={{ cursor: "pointer" }} onClick={toggleMode}>
                    Login
                  </span>
                </p>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}