import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { getUserProfile } from "../api/api";

export default function Profile() {

  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobileNumber: ""
  });

  const [loading, setLoading] = useState(false);


  /* FETCH PROFILE */

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await getUserProfile(storedUser.id)
        

        const user = {
          id: res.data.user._id,
          ...res.data.user
        };

        setStoredUser(user);

        setFormData({
          userName: user.userName,
          email: user.email,
          mobileNumber: user.mobileNumber
        });

      } catch (err) {

        alert("Failed to load profile");

      }

    };

    if (storedUser?.id) {
      fetchProfile();
    }

  }, [storedUser.id]);


  /* INPUT CHANGE */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  /* SAVE PROFILE */

  const saveProfile = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await updatedUser(
       storedUser.id,
        formData
      );

      const updatedUser = {
        id: res.data.updatedUser._id,
        ...res.data.updatedUser
      };

      /* update localStorage */

      localStorage.setItem("user", JSON.stringify(updatedUser));

      /* update state */

      setStoredUser(updatedUser);

      setFormData({
        userName: updatedUser.userName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber
      });

      setEditing(false);

      alert("Profile updated successfully");

    } catch (err) {

      alert("Update failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="bg-light min-vh-100 py-5">

      <Container>

        <Row className="justify-content-center">

          <Col lg={6}>

            <Card className="border-0 shadow-lg rounded-4">

              <Card.Body className="p-5">

                {/* PROFILE HEADER */}

                <div className="text-center mb-4">

                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}
                  >
                    {formData.userName?.charAt(0)?.toUpperCase()}
                  </div>

                  <h4 className="fw-bold mb-0">
                    {formData.userName}
                  </h4>

                  <p className="text-muted small">
                    Manage your account details
                  </p>

                </div>


                <Form onSubmit={saveProfile}>

                  {/* USERNAME */}

                  <Form.Group className="mb-3">

                    <Form.Label>Username</Form.Label>

                    <Form.Control
                      type="text"
                      name="userName"
                      value={formData.userName}
                      disabled={!editing}
                      onChange={handleChange}
                    />

                  </Form.Group>


                  {/* EMAIL */}

                  <Form.Group className="mb-3">

                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled={!editing}
                      onChange={handleChange}
                    />

                  </Form.Group>


                  {/* MOBILE */}

                  <Form.Group className="mb-4">

                    <Form.Label>Mobile Number</Form.Label>

                    <Form.Control
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      disabled={!editing}
                      onChange={handleChange}
                    />

                  </Form.Group>


                  {!editing ? (

                    <Button
                      className="w-100 fw-semibold"
                      type="button"
                      onClick={() => setEditing(true)}
                    >
                      Edit Profile
                    </Button>

                  ) : (

                    <div className="d-flex gap-2">

                      <Button
                        type="submit"
                        variant="success"
                        className="w-100"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </Button>

                      <Button
                        type="button"
                        variant="outline-secondary"
                        className="w-100"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </Button>

                    </div>

                  )}

                </Form>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>

  );

}