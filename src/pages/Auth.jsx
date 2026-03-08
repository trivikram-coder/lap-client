import { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";

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

        navigate("/");

      } else {

        await registerUser(
          form
        );

        alert("Registered Successfully");
        setIsLogin(true);

      }

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Card
        className="p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "12px" }}
      >

        <h3 className="text-center mb-3">
          {isLogin ? "Login" : "Register"}
        </h3>

        <Form onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <Form.Control
                className="mb-3"
                placeholder="Username"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                required
              />

              <Form.Control
                className="mb-3"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button className="w-100 mb-2" type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>

        </Form>

        {isLogin && (
          <div className="text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        )}

        <div className="text-center mt-3">

          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={toggleMode}
              >
                Register
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={toggleMode}
              >
                Login
              </span>
            </p>
          )}

        </div>

      </Card>

    </Container>
  );
}