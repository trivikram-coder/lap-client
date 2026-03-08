import { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const verify = async (e) => {

    e.preventDefault();

    try {

      await axios.post(`https://email.vkstore.site/otp/verify-otp/${email}`, {
        otp
      });

      navigate("/reset-password", { state: { email } });

    } catch (err) {
      toast.error("Invalid OTP");
    }

  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Card
        className="shadow-lg p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >

        <h3 className="text-center mb-3">
          Verify OTP
        </h3>

        <p className="text-center text-muted mb-4">
          Enter the OTP sent to your email
        </p>

        <Form onSubmit={verify}>

          <Form.Control
            type="text"
            placeholder="Enter OTP"
            className="mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-100"
          >
            Verify OTP
          </Button>

        </Form>

      </Card>

    </Container>

  );

}