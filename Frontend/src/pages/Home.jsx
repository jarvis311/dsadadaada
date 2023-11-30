import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { API } from '../App';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    defaults
  } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Cookies from 'js-cookie';

defaults.font.family = 'Maven Pro';
defaults.font.size = 14

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState(
        {
            RC_detail: "",
            RC_count: "",
            User: "",
            License_Information: "",
        }
    )
    const getData = async () => {
        const Result = await API.post("/api/dashboard/get_dashboard", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData({
            RC_detail: Result.data.response.RC_detail,
            RC_count: Result.data.response.RC_count,
            User: Result.data.response.User,
            License_Information: Result.data.response.License_Information,
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const vehiclecountoptions = {
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: 50,
            },
            grid: {
              display: true,
            },
            scaleLabel: {
              display: true,
            }
          },
          x: {
            grid: {
              display: false,
            },
            scaleLabel: {
              display: true,
            }
          }
        }
    };

    const vehiclecountdata = {
        labels: ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR'],
        datasets: [
        {
            label: 'Fuel',
            data: [90, 100, 105, 89, 102, 101, 90, 100, 105, 89, 102, 101],
            barThickness: 16,
            backgroundColor: '#DB73FF',
        }],
    };

    const vehiclesourcedata = {
        labels: ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR'],
        datasets: [
        {
            label: 'Fuel',
            data: [90, 100, 120, 89, 102, 125, 90, 75, 105, 89, 102, 101],
            borderColor: '#1FD9A3',
        }],
    };

    return (
        <Layout sidebar={true}>
            <div className="vv-dashboard">
                <Row>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter orange">
                                    <div className="counter-media">
                                        <i className='bx bxs-info-circle'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.RC_detail}</h3>
                                        <p>RC Details</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter pink">
                                    <div className="counter-media">
                                        <i className='bx bxs-credit-card'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.RC_count}</h3>
                                        <p>RC Count</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter green">
                                    <div className="counter-media">
                                        <i className='bx bxs-file-doc'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.User}</h3>
                                        <p>User Document</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={3} xl={4} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="counter blue">
                                    <div className="counter-media">
                                        <i className='bx bxs-id-card'></i>
                                    </div>
                                    <div className="counter-content">
                                        <h3>{Data.License_Information}</h3>
                                        <p>License Information</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="attch-link green">
                                    <div className="attch-link-title">
                                        <i className='bx bxs-credit-card-front'></i>
                                        <h4>RC Information</h4>
                                    </div>
                                    <div className="attch-link-content">
                                        <ul>
                                            <li><Link to="/rc_details">RC Details</Link></li>
                                            <li><Link to="/rc_count">RC Count</Link></li>
                                            <li><Link to="/carinfo">CarInfo RC Count</Link></li>
                                            <li><Link to="/rc_block">RC Block</Link></li>
                                            <li><Link to="/license_Information">License Info.</Link></li>
                                            <li><Link to="/fail_data">Fail Data</Link></li>
                                            <li><Link to="/rc_reminder">Reminder</Link></li>
                                            <li><Link to="/rc_feedback">Feedback</Link></li>
                                            <li><Link to="/notification_report">Notification Report</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Vehicle Count</h4>
                                </div>
                                <Bar options={vehiclecountoptions} data={vehiclecountdata} height="68"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xxl={3} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="attch-link red">
                                    <div className="attch-link-title">
                                        <i className='bx bxs-check-circle'></i>
                                        <h4>API</h4>
                                    </div>
                                    <div className="attch-link-content">
                                        <ul>
                                            <li><Link to="/app_update">App Update</Link></li>
                                            <li><Link to="/proxy">Authorization</Link></li>
                                            <li><Link to="/API_Priority">API Priority</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={9} md={6}>
                        <Card>
                            <Card.Body>
                                <div className="chart-title">
                                    <h4>Vehicle Source</h4>
                                </div>
                                <Line options={vehiclecountoptions} data={vehiclesourcedata} height="68"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Home