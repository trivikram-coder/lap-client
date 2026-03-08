import { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../api/api";
import { toast } from "react-toastify";

export default function ForgetPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      toast.info("Please enter email");
      return;
    }

    try {

      setLoading(true);

      // 1️⃣ Check if email exists
      await checkEmail(email);

      // 2️⃣ Send OTP
      await axios.post("https://email.vkstore.site/otp/send-otp", { email,appName:"LAP",type:"Forgot" });

      // 3️⃣ Navigate to OTP page
      navigate("/verify-otp", { state: { email } });

    } catch (err) {

      toast.error(err.response?.data?.message || "Email not found");

    } finally {
      setLoading(false);
    }

  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Card
        className="shadow-lg p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >

        <h3 className="text-center mb-3">
          Forgot Password
        </h3>

        <p className="text-center text-muted mb-4">
          Enter your registered email to receive OTP
        </p>

        <Form onSubmit={handleSubmit}>

          <Form.Control
            type="email"
            placeholder="Enter your email"
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>

        </Form>

      </Card>

    </Container>

  );

}