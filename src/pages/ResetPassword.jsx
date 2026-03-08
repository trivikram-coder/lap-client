import { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/api";
import { toast } from "react-toastify";

export default function ResetPassword(){

  const [password,setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async(e) => {

    e.preventDefault();

    try{

      await resetPassword({
        email,
        newPassword: password
      });

      toast.success("Password Reset Successful");

      navigate("/login");

    }catch(err){
      toast.error(err.response?.data?.message || "Error resetting password");
    }

  };

  return(

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Card
        className="shadow-lg p-4"
        style={{width:"400px", borderRadius:"12px"}}
      >

        <h3 className="text-center mb-3">
          Reset Password
        </h3>

        <p className="text-center text-muted mb-4">
          Enter your new password
        </p>

        <Form onSubmit={handleSubmit}>

          <Form.Control
            type="password"
            placeholder="New Password"
            className="mb-3"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-100"
          >
            Reset Password
          </Button>

        </Form>

      </Card>

    </Container>

  );

}