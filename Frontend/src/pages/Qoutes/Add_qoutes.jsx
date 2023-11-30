import React, { useState } from "react";
import { Breadcrumb, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Switch from 'react-switch';
import Cookies from "js-cookie";
import Layout from '../../layout/Layout';

const Add_qoutes = () => {
    const token = Cookies.get("fmljwt");
    const [validated, setvalidated] = useState(false)
    const [status, setstatus] = useState(0)
    const navigate = useNavigate()
    const [Data, setData] = useState([{
        en: "",
        bn: "",
        hi: "",
        mr: "",
        gu: "",
        ta: "",
        te: "",
        kn: "",
        pa: "",
        or: "",
        ml: "",
        status: "",
    }])

    const SaveData = async (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }

    const Submite = async () => {
        if (Data.en == undefined || Data.bn == undefined || Data.hi == undefined || Data.mr == undefined ||
            Data.gu == undefined || Data.ta == undefined || Data.te == undefined || Data.kn == undefined ||
            Data.pa == undefined || Data.or == undefined || Data.ml == undefined) {
            setvalidated(true)
        } else {
            const Form = new FormData()
            Form.append('en', Data.en)
            Form.append('bn', Data.bn)
            Form.append('hi', Data.hi)
            Form.append('mr', Data.mr)
            Form.append('gu', Data.gu)
            Form.append('ta', Data.ta)
            Form.append('te', Data.te)
            Form.append('kn', Data.kn)
            Form.append('pa', Data.pa)
            Form.append('or', Data.or)
            Form.append('ml', Data.ml)
            Form.append('status', status)
            const Result = await API.post(`/api/qoutes/add/qoutes`, Form, { headers: { Authorization: `Bearer ${token}` } })
            if (Result) {
                toast.success("Data Saved successfully");
                navigate(`/qoutes`)
            }
        }
    }

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Quotes Add</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/qoutes">Quotes</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Quotes</Breadcrumb.Item>
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
                                            <Form.Label htmlFor="icon">English Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="en"
                                                onChange={SaveData}
                                                className="my-2"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                English Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Hindi Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="hi"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Hindi Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Marathi Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="mr"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Marathi Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Gujarati Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="gu"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Gujarati Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Tamil Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="ta"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Tamil Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Telugu Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="te"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Telugu Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Kannada Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="kn"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Kannada Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Bengali Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="bn"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Bengali Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Panjab Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="pa"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Punjab Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Odisha Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="or"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Odisha Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="icon">Malayalam Quotes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                name="ml"
                                                className="my-2"
                                                onChange={SaveData}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Malayalam Quotes Field Is Require
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Label htmlFor="status" className="d-block mb-2">
                                                Status
                                            </Form.Label>
                                            <Switch
                                                onChange={(checked) => { checked === true ? setstatus(1) : setstatus(0) }}
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
                                    <Link to='/qoutes'>
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

export default Add_qoutes