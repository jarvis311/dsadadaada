import React, { useState } from "react";
import { Breadcrumb, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Switch from 'react-switch';
import Layout from '../../layout/Layout';
import Cookies from "js-cookie";

const Add_Api_statuses = () => {
  const token = Cookies.get("fmljwt");
  const [validated, setvalidated] = useState(false)
  const [status, setstatus] = useState(0)
  const navigate = useNavigate()
  const [Data, setData] = useState([{
    third_party_api:"",
    status:"",
}])

  const SaveData = async(e)=>{
    setData({...Data , [e.target.name]:e.target.value})
  }

  const Submite = async()=>{
    if(Data.third_party_api == undefined){
      setvalidated(true)
    }else{
      const Form = new FormData()
      Form.append('third_party_api' , Data.third_party_api)
      Form.append('status',status)
      const Result = await API.post(`/api/api_status/create_api_statuses` , Form , {headers: { Authorization: `Bearer ${token}` }})
      if (Result) {
        toast.success("Data Saved successfully");
        navigate(`/API_Priority`)
  }
    }
  }
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3>API Priority Add</h3>
        <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item >
                <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <Link to="/API_Priority">API Priority</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create API Priority</Breadcrumb.Item>
        </Breadcrumb>
    </div>

    <div className="page-content">
        <Form noValidate validated={validated}>
            <Row>
                <Col xs={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Label htmlFor="icon">Thirdparty API</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="third_party_api"
                                        onChange={SaveData}
                                        className="my-2"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Thirdparty API Field Is Require
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={2}>
                                <Form.Label htmlFor="status" className="d-block mb-2">
                                  Status
                                </Form.Label>
                                <Switch
                                  onChange={(checked) => { checked === true ?  setstatus(1) : setstatus(0) }}
                                  name="status"
                                  checked={status === 1 ? true : false}
                                  offColor="#C8C8C8"
                                  onColor="#0093ed"
                                  height={30}
                                  width={70}
                                  className="react-switch"
                                  uncheckedIcon={
                                    <div className="react-switch-off">Off</div>
                                  }
                                  checkedIcon={<div className="react-switch-on">On</div>}
                                />
                              </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" onClick={Submite} className="me-3">Save</Button>
                            <Link to='/API_Priority'>
                                <Button variant="secondary">Cancle</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Form>
    </div>
</Layout>
  )
}

export default Add_Api_statuses