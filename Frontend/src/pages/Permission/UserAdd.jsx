import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Cookies from "js-cookie";
import { SelectPicker } from "rsuite";
import $ from "jquery";

const UserAdd = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const [validated, setvalidated] = useState(false)
  const [platformHook, setplatformHook] = useState([])
  const [platVal, setPlatVal] = useState(false)
  const [AddData, setAddData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })

  const handleChange = (e) => {
    setAddData({ ...AddData, [e.target.name]: e.target.value })
  }

  const platformLinkHendler = async (e) => {
    setPlatVal(false)
    setAddData({ ...AddData, ['role']: e })
  };

  const roleData = async () => {
    const resut = await API.post("/api/rolePermission/get/role", {}, { headers: { Authorization: `Bearer ${token}` } });
    let platform_array = []
    platform_array.push({ label: "Select Role", value: "" })
    resut.data.Data.map((val, index) => {
      platform_array.push({ label: val.name, value: val._id })
    })
    setplatformHook(platform_array)
  };

  const submitData = async () => {
    if (AddData.role === "") {
      setPlatVal(true)
    } else {
      setPlatVal(false)
    }
    if (AddData.name === "" || AddData.email === "" || AddData.password === "") {
      setvalidated(true)
    }
    else if (AddData.role === "") {
      setPlatVal(true)
    }
    else {
      setvalidated(false)
      setPlatVal(false)
      const Form = new FormData()
      Form.append('name', AddData.name.trim())
      Form.append('email', AddData.email.trim())
      Form.append('password', AddData.password.trim())
      Form.append('role', AddData.role)
      const res = await API.post("/api/appuser/add/user", Form, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("User Created Successfully")
      navigate("/User")
    }
  }

  useEffect(() => {
    roleData()
  }, [])
  return (
    <>
      <Layout sidebar={true}>
        <div className="page-heading">
          <h3>Create User</h3>
          <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item>
              <Link to="/home">
                <i className="bx bx-home-alt me-2 fs-5"></i> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/User">User List</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create User</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="page-content">
          <Form noValidate validated={validated}>
            <Row>
              <Col xs={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="text" className="my-2" name="name" value={AddData.name} required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">
                          Name Field Is Require
                        </Form.Control.Feedback>
                      </Col>

                      <Col md={3}>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="text" className="my-2" name="email" value={AddData.email} required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">
                          Email Field Is Required
                        </Form.Control.Feedback>
                      </Col>

                      <Col md={3}>
                        <Form.Label htmlFor="adslink">Password</Form.Label>
                        <Form.Control type="text" className="my-2" name="password" value={AddData.password} required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">
                          Password Field Is Required
                        </Form.Control.Feedback>
                      </Col>

                      <Col md={3}>
                        <Form.Label htmlFor="Role">Role</Form.Label>
                        <SelectPicker
                          cleanable={false}
                          data={platformHook}
                          name="platform"
                          defaultValue={""}
                          className={`my-2 rs_UserAdd68 ${platVal ? 'was-invalid' : ""}`}
                          block
                          placeholder="Select platform"
                          onChange={(e) => platformLinkHendler(e)}
                          required
                          onEnter={() => { $(".rs_UserAdd68").addClass("arrUpDown") }}
                          onExit={() => { $(".rs_UserAdd68").removeClass("arrUpDown") }}
                        />
                        {
                          platVal ? <div className="invalid-feedback d-block">Role Field is required.</div> : ""
                        }
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="text-end">
                    <Button variant="primary" className="me-3" onClick={submitData}>
                      Save
                    </Button>
                    <Link to="/User">
                      <Button variant="secondary">Cancle</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </Layout>
    </>
  )
}
export default UserAdd