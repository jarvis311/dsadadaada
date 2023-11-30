import Cookies from "js-cookie";
import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";
import { API } from "../../App";
import Layout from '../../layout/Layout';

var Page_array = [];
var language_array = [];
const Qoutes = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [query, setquery] = useState({search:""})
    const [loading, setloading] = useState(true)
    const GetData = async () => {
        if (query.search !== "") {
            const Form = new FormData()
            Form.append('search' , query.search)
            const Result = await API.post('/api/qoutes/serach/quotes' , Form , { headers: { Authorization: `Bearer ${token}` } })
            if (Result.data.Data.length === 0) {
                setData([])
            } else {
                setData(Result.data.Data)
            }
        } else {
        const result = await API.post("/api/qoutes/get/qoutes", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        PageGetData()
        setloading(false)
        }
    }

    // Paggintion Code //
    const getData1 = (current, pageSize) => {
        return Data.slice((current - 1) * pageSize, current * pageSize);
    };

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(Data.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    };

    const paginationData = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
    };

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === "prev") {
            return <button className="paggination-btn">Previous</button>;
        }
        if (type === "next") {
            return <button className="paggination-btn">Next</button>;
        }
        return originalElement;
    };

    const PageGetData = async () => {
        var PageNumber = [10, 25, 50, 100]
        Page_array = []
        PageNumber.map((val, index) => {
            Page_array.push({ label: val, value: val })
        })
        setPageHook(Page_array)
    };

    // const languageGetData = async () => {
    //     var LanguageData = ["English", "Hindi","Marathi","Gujarati" ,"Tamil" , "Telugu" , "Kannada" , "Bangali" , "Panjabi" , "Odisha" , "Malyalam"]
    //     language_array = []
    //     LanguageData.map((val, index) => {
    //         language_array.push({ label: val, value: val })
    //     })
    //     setlanguageHook(language_array)
    // };

    const Togglechange = async (id, e, name) => {
        var status;

        if (name === "status") {
            status = e === true ? 1 : 0;
        }
        const Form = new FormData();
        Form.append("id", id);
        Form.append("name", name);
        Form.append("status", status);
        const result = await API.post("/api/qoutes/toggle/status", Form, { headers: { Authorization: `Bearer ${token}` } });
        if (result) {
            toast.success(" status Update successfully");
            GetData();
        }
    };

    const Searching = async(e , name)=>{
        if(name == "search"){
            setquery({...query , [name] : e.target.value})
        }
        const Form = new FormData()
        Form.append('search' , name == "search" ? e.target.value : query.search)
        const Result = await API.post('/api/qoutes/serach/quotes' , Form , { headers: { Authorization: `Bearer ${token}` } })
       setData(Result.data.Data)
    }

    useEffect(() => {
        GetData()
    }, [])
    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Quotes</h3>
                <div className="page-heading-right">
                    <Form.Control
                        type="text"
                        name="reg_no"
                        placeholder="Search Quotes"
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => Searching(e,"search")}
                    />

                    {/* <SelectPicker
                        cleanable={false}
                        data={languageHook}
                        searchable={false}  
                        // style={{ width: 224 }}
                        defaultValue={"English"}
                        className="wv-150 my-1 ms-3"
                    /> */}

                    <SelectPicker
                        cleanable={false}
                        data={PageHook}
                        searchable={false}
                        defaultValue={10}
                        className="wv-100 my-1 ms-3"
                        onChange={(e) => {
                            setSize(Number(e));
                            setCurrent(1);
                        }}
                    />
                    <Link to="/Add/qoutes" className="my-1 ms-3">
                        <Button variant="primary" value="create">Add New</Button>
                    </Link>
                </div>
            </div>
            <div className="page-content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            <th width="5%" className="text-center">No</th>
                                            <th width="40%">Quotes</th>
                                            <th width="45%">Other Quotes</th>
                                            <th width="10%" className="text-center">Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData1(current, size).map((val, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                        <td>{val.en}</td>
                                                        <td>{val.hi}</td>
                                                        <td className="text-center">
                                                            <Switch
                                                                onChange={(e) => {
                                                                    Togglechange(val._id, e, "status");
                                                                }}
                                                                checked={val.status === 1 ? true : false}
                                                                offColor="#C8C8C8"
                                                                onColor="#0093ed"
                                                                height={30}
                                                                width={70}
                                                                className="react-switch"
                                                                uncheckedIcon={
                                                                    <div className="react-switch-off">Off</div>
                                                                }
                                                                checkedIcon={
                                                                    <div className="react-switch-on">On</div>
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    {
                                        loading == false && Data.length === 0 ? <tr>
                                            <td colSpan="100%" className="p-0">
                                                <div className='no-found'>
                                                    <img src="../../not-found/image.svg" />
                                                    <p>No Found Quotes</p>
                                                </div>
                                            </td>
                                        </tr> : ""
                                    }
                                </Table>
                                {Data.length > size ? (
                                    <div className="pagination-custom">
                                        <Pagination
                                            showTitle={false}
                                            className="pagination-data"
                                            onChange={paginationData}
                                            total={Data.length}
                                            current={current}
                                            pageSize={size}
                                            showSizeChanger={false}
                                            itemRender={PrevNextArrow}
                                            onShowSizeChange={PerPageChange}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Qoutes