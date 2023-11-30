import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";
import { API } from "../../App";
import Switch from 'react-switch';
import Fancybox from "../../Component/FancyBox";
import Layout from '../../layout/Layout';
import Cookies from "js-cookie";
import Pagination from "rc-pagination";

var Page_array = [];
var Version_array = [];
var status_array = [];
const Feedback = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [loading, setloading] = useState(true)
    const [StatusData, setStatusData] = useState([])
    const [versionData, setversionData] = useState([])
    const [Query, setQuery] = useState({
        status: "",
        version_code: "",
    });

    const GetData = async () => {
        const result = await API.post("/api/feedback/get_feedback", {}, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        PageGetData()
        StatusDropdwon()
        versionDropdwon()
        setloading(false)
    }

    const StatusDropdwon = async () => {
        var StatusData = [
            {lable:"On" , value:1},
            {lable:"Off" , value:0},
        ]
        status_array = []
        status_array.push({ label: "All", value: "" })
        StatusData.map((val, index) => {
            status_array.push({ label: val.lable, value: val.value })
        })
        setStatusData(status_array)
    };

    const versionDropdwon = async () => {
        const result = await API.post("/api/feedback/version_dropdownData", {}, { headers: { Authorization: `Bearer ${token}` } })
        Version_array = []
        Version_array.push({ label: "All", value: "" })
        result?.data?.Data.map((val, index) => {
            Version_array.push({ label: val, value: val })
        })
        setversionData(Version_array)
    };



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

    const Togglechange = async (id, e, name) => {
        var status;
        if (name === "status") {
            status = e === true ? 1 : 0;
        }
        const Form = new FormData();
        Form.append("id", id);
        Form.append("name", name);
        Form.append("status", status);
        const result = await API.post("/api/feedback/toggle_feedback", Form, { headers: { Authorization: `Bearer ${token}` } });
        if (result) {
            toast.success(" status Update successfully");
            GetData();
        }
    };


    const QueryHendler = async (e, name) => {
         setQuery({ ...Query, [name]: e })
        const Form = new FormData()
        Form.append("status", name == "status" ? e : Query.status)
        Form.append("version_code", name == "version_code" ? e : Query.version_code)
        const result = await API.post("/api/feedback/searching_feedback", Form, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
    }


    useEffect(() => {
        GetData()
    }, [])
  return (
    <Layout sidebar={true}>
    <div className="page-heading">
        <h3 className="my-1">Feedback</h3>
        <div className="page-heading-right">
            <SelectPicker
                cleanable={false}
                data={versionData}
                searchable={false}
                defaultValue={""}
                className="wv-150 my-1 ms-3"
                onChange={(e) => QueryHendler(e, "version_code")}
            />
            <SelectPicker
                cleanable={false}
                data={StatusData}
                searchable={false}
                defaultValue={""}
                className="wv-150 my-1 ms-3"
                onChange={(e) => QueryHendler(e, "status")}
            />
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
                                    <th width="15%">Review</th>
                                    <th width="15%">Ratings</th>
                                    <th width="15%">Contact Information</th>
                                    <th width="12%">Version Code</th>
                                    <th width="14%">Version Name</th>
                                    <th width="14%">Image</th>
                                    <th width="10%" className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getData1(current, size).map((val, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                <td>{val.review}</td>
                                                <td>{val.retings}</td>
                                                <td>{val.contact_information}</td>
                                                <td>{val.version_code}</td>
                                                <td>{val.version_name}</td>
                                                <td>{
                                                    val.image.map((img , i)=>{
                                                        return(
                                                        <Fancybox>
                                                            <a href={img.image} data-fancybox="gallery" className="me-2">
                                                                <img src={img.image} className="hv-40 rounded-3" alt="" />
                                                            </a>
                                                        </Fancybox>
                                                        )
                                                    })
                                                    }</td>
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
                                                    <div className="react-switch-off">OFF</div>
                                                }
                                                checkedIcon={
                                                    <div className="react-switch-on">ON</div>
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
                                            <p>No Found Feedback</p>
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

export default Feedback