import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { getUserProfile, updateUserProfile } from "../api/api";
import { toast } from "react-toastify";

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

        const res = await getUserProfile(storedUser.id);

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

        toast.error("Failed to load profile");

      }

    };

    if (storedUser?.id) {
      fetchProfile();
    }

  }, []);


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

      const res = await updateUserProfile(
        storedUser.id,
        formData
      );

      const updatedUser = {
        id: res.data.updatedUser._id,
        ...res.data.updatedUser
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setStoredUser(updatedUser);

      setFormData({
        userName: updatedUser.userName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber
      });

      setEditing(false);

      toast.success("Profile updated successfully");

    } catch (err) {

      toast.error("Update failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="bg-light min-vh-100 py-5">

      <Container>

        <Row className="justify-content-center">

          <Col lg={7} md={9}>

            <Card className="border-0 shadow rounded-4">

              <Card.Body className="p-5">

                {/* PROFILE HEADER */}

                <div className="text-center mb-5">

                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      fontSize: "28px",
                      fontWeight: "bold"
                    }}
                  >
                    {formData.userName?.charAt(0)?.toUpperCase()}
                  </div>

                  <h3 className="fw-bold mb-1">
                    {formData.userName || "User"}
                  </h3>

                  <p className="text-muted small">
                    Manage your account information
                  </p>

                </div>


                {/* PROFILE FORM */}

                <Form onSubmit={saveProfile}>

                  <Row>

                    <Col md={12}>

                      <Form.Group className="mb-4">

                        <Form.Label className="fw-semibold">
                          Username
                        </Form.Label>

                        <Form.Control
                          type="text"
                          name="userName"
                          value={formData.userName}
                          disabled={!editing}
                          onChange={handleChange}
                          className="py-2"
                        />

                      </Form.Group>

                    </Col>


                    <Col md={12}>

                      <Form.Group className="mb-4">

                        <Form.Label className="fw-semibold">
                          Email Address
                        </Form.Label>

                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled={!editing}
                          onChange={handleChange}
                          className="py-2"
                        />

                      </Form.Group>

                    </Col>


                    <Col md={12}>

                      <Form.Group className="mb-4">

                        <Form.Label className="fw-semibold">
                          Mobile Number
                        </Form.Label>

                        <Form.Control
                          type="text"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          disabled={!editing}
                          onChange={handleChange}
                          className="py-2"
                        />

                      </Form.Group>

                    </Col>

                  </Row>


                  {/* BUTTONS */}

                  {!editing ? (

                    <Button
                      variant="primary"
                      className="w-100 py-2 fw-semibold"
                      type="button"
                      onClick={() => setEditing(true)}
                    >
                      Edit Profile
                    </Button>

                  ) : (

                    <div className="d-flex gap-3">

                      <Button
                        type="submit"
                        variant="success"
                        className="w-100 py-2"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>

                      <Button
                        type="button"
                        variant="outline-secondary"
                        className="w-100 py-2"
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