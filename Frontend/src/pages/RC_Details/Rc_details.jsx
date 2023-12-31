import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { SelectPicker } from "rsuite";
import { API } from "../../App";
import Layout from '../../layout/Layout';
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Pagination from "rc-pagination";

var Page_array = [];
var State_array = [];
var Source_array = [];
const Rc_details = () => {
    const token = Cookies.get("fmljwt");
    const [Data, setData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [PageHook, setPageHook] = useState([])
    const [State_Data, setState_Data] = useState([])
    const [Source, setSource] = useState([])
    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(true)
    const [View_Data, setView_Data] = useState({
        _id: "",
        status: "",
        enginne_no:"",
        rto: "",
        reg_no: "",
        reg_dt: "",
        chasi_no: "",
        owner_name: "",
        vh_class: "",
        fuel_type: "",
        maker: "",
        vehicle_age: "",
        insUpto: "",
        state: "",
        policy_no: "",
        puc_no: "",
        puc_upto: "",
        insurance_comp: "",
        source: "",
        maker_modal: "",
        father_name: "",
        address: "",
        owner_sr_no: 0,
        insurance_company: "",
        vehicle_color: "",
        fitness_upto: "",
        parivahan_json: "",
        own_json: "",
        financer_details: "",
        fuel_norms: "",
        no_of_seats: 0,
        body_type_desc: "",
        reng_at: "",
        menufacturer_month_yr: "",
        gvw: "",
        no_of_cyl: "",
        cubic_cap: "",
        sheeper_cap: "",
        stand_cap: "",
        wheelbase: "",
        mobile_no: "",
        permit_no: "",
        permit_issue_date: "",
        permit_from: "",
        permit_upto: "",
        permit_type: "",
        rc_np_no: "",
        rc_np_upto: "",
        rc_np_issued_by: "",
        rc_unid_wt: "",
        blacklist_status: "",
        noc_details: "",
        tax_upto: ""
    })
    const [Query, setQuery] = useState({
        collectionNames: "GJ",
        searchvalue: "",
        source: "",
    });

    const GetData = async () => {
        const Form = new FormData()
        Form.append("collectionNames", Query.collectionNames)
        const result = await API.post("/api/rc_count/Get_state_data", Form, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
        setloading(false)
    }

    useEffect(() => {
        GetData()
        PageGetData()
        stateGetData()
        sourceGetData()
    }, [])


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

    const stateGetData = async () => {
        var state = ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LA', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB']
        State_array = []
        state.map((val, index) => {
            State_array.push({ label: val, value: val })
        })
        setState_Data(State_array)
    };

    const sourceGetData = async () => {
        const sourceData = await API.post("/api/api_status/get_api_statuses", {}, { headers: { Authorization: `Bearer ${token}` } })
        Source_array = []
        Source_array.push({ label: "Select Source", value: "" })
        sourceData.data.Data.map((val, index) => {
            Source_array.push({ label: val.third_party_api, value: val.third_party_api })
        })
        setSource(Source_array)
    };

    const QueryHendler = async (e, name) => {
        if (name === "searchvalue") {
            setQuery({ ...Query, [e.target.name]: e.target.value });
        } else if (name === "") {
            GetData()
        } else {
            setQuery({ ...Query, [name]: e })
        }
        const Form = new FormData()
        Form.append("searchvalue", name == "searchvalue" ? e.target.value : Query.searchvalue);
        Form.append("collectionNames", name == "collectionNames" ? e : Query.collectionNames)
        Form.append("source", name == "source" ? e : Query.source)
        const result = await API.post("/api/rc_count/Get_state_data", Form, { headers: { Authorization: `Bearer ${token}` } })
        setData(result.data.Data)
    }

    const handleShow = async (id) => {
        setShow(true)
        const Form = new FormData()
        Form.append('id', id)
        Form.append('collectionNames', Query.collectionNames)
        const result = await API.post("/api/rc_count/Get_state_data_ID", Form, { headers: { Authorization: `Bearer ${token}` } })
        setView_Data({
            _id: result.data.Data[0]._id,
            status: result.data.Data[0].status,
            enginne_no: result.data.Data[0].enginne_no,
            rto: result.data.Data[0].rto,
            reg_no: result.data.Data[0].reg_no,
            reg_dt: result.data.Data[0].reg_dt,
            chasi_no: result.data.Data[0].chasi_no,
            owner_name: result.data.Data[0].owner_name,
            vh_class: result.data.Data[0].vh_class,
            fuel_type: result.data.Data[0].fuel_type,
            maker: result.data.Data[0].maker,
            vehicle_age: result.data.Data[0].vehicle_age,
            insUpto: result.data.Data[0].insUpto,
            state: result.data.Data[0].state,
            policy_no: result.data.Data[0].policy_no,
            puc_no: result.data.Data[0].puc_no,
            puc_upto: result.data.Data[0].puc_upto,
            insurance_comp: result.data.Data[0].insurance_comp,
            source: result.data.Data[0].source,
            maker_modal: result.data.Data[0].maker_modal,
            father_name: result.data.Data[0].father_name,
            address: result.data.Data[0].address,
            owner_sr_no: 0,
            insurance_company: result.data.Data[0].insurance_company,
            vehicle_color: result.data.Data[0].vehicle_color,
            fitness_upto: result.data.Data[0].fitness_upto,
            parivahan_json: result.data.Data[0].parivahan_json,
            own_json: result.data.Data[0].own_json,
            financer_details: result.data.Data[0].financer_details,
            fuel_norms: result.data.Data[0].fuel_norms,
            no_of_seats: 0,
            body_type_desc: result.data.Data[0].body_type_desc,
            reng_at: result.data.Data[0].reng_at,
            menufacturer_month_yr: result.data.Data[0].menufacturer_month_yr,
            gvw: result.data.Data[0].gvw,
            no_of_cyl: result.data.Data[0].no_of_cyl,
            cubic_cap: result.data.Data[0].cubic_cap,
            sheeper_cap: result.data.Data[0].sheeper_cap,
            stand_cap: result.data.Data[0].stand_cap,
            wheelbase: result.data.Data[0].wheelbase,
            mobile_no: result.data.Data[0].mobile_no,
            permit_no: result.data.Data[0].permit_no,
            permit_issue_date: result.data.Data[0].permit_issue_date,
            permit_from: result.data.Data[0].permit_from,
            permit_upto: result.data.Data[0].permit_upto,
            permit_type: result.data.Data[0].permit_type,
            rc_np_no: result.data.Data[0].rc_np_no,
            rc_np_upto: result.data.Data[0].rc_np_upto,
            rc_np_issued_by: result.data.Data[0].rc_np_issued_by,
            rc_unid_wt: result.data.Data[0].rc_unid_wt,
            blacklist_status: result.data.Data[0].blacklist_status,
            noc_details: result.data.Data[0].noc_details,
            tax_upto: result.data.Data[0].tax_upto
        })
    }
    const handleClose = () => setShow(false);

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3 className="my-1">Vehicle Details</h3>
                <div className="page-heading-right">
                    <Form.Control
                        type="text"
                        name="searchvalue"
                        placeholder="Search Registation No."
                        className="wv-200 my-1 ms-3"
                       onChange={(e) => QueryHendler(e, "searchvalue")}
                    />

                    <SelectPicker
                        cleanable={false}
                        data={Source}
                        searchable={false}
                        defaultValue={""}
                        placement="bottomEnd"
                        className="wv-200 my-1 ms-3"
                        onChange={(e) => QueryHendler(e, "source")}
                    />

                    <SelectPicker
                        cleanable={false}
                        data={State_Data}
                        searchable={false}
                        defaultValue={"GJ"}
                        className="wv-100 my-1 ms-3"
                        onChange={(e) => QueryHendler(e, "collectionNames")}
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
                                            <th width="10%">Reg. No</th>
                                            <th width="20%">Owner Name</th>
                                            <th width="15%">Chassis No</th>
                                            <th width="15%">Engine No</th>
                                            <th width="10%">Date</th>
                                            <th width="15%">Source</th>
                                            <th width="10%" className='text-center'>Show Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData1(current, size).map((val, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                                                        <td>{val.reg_no}</td>
                                                        <td>{val.owner_name}</td>
                                                        <td>{val.chasi_no}</td>
                                                        <td>{val.enginne_no}</td>
                                                        <td>{dayjs(val?.createdAt).format('DD-MM-YYYY')}</td>
                                                        <td>{val.source}</td>
                                                        <td className='text-center'>
                                                            <Button variant="primary" size="sm" onClick={() => handleShow(val._id)} >More Details</Button>
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
                                                    <p>No Found Vehicle Details</p>
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
            <Modal
                show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="user-details"
                className="user-details-modal"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title id="user-details">
                        User Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="user-details">
                        <p>ID</p>
                        <span>{View_Data._id}</span>
                    </div>
                    <div className="user-details">
                        <p>Owner Name</p>
                        <span>{View_Data.owner_name}</span>
                    </div>
                    <div className="user-details">
                        <p>Father Name</p>
                        <span>{View_Data.father_name}</span>
                    </div>

                    <div className="user-details">
                        <p>Owner Sr. Name</p>
                        <span>{View_Data.owner_sr_no}</span>
                    </div>

                    <div className="user-details">
                        <p>Address</p>
                        <span>{View_Data.address}</span>
                    </div>

                    <div className="user-details">
                        <p>Mobile No</p>
                        <span>{View_Data.mobile_no}</span>
                    </div>
    
                    <div className="user-details">
                        <p>Chasis No</p>
                        <span>{View_Data.chasi_no}</span>
                    </div>
    
                    <div className="user-details">
                        <p>Engine No</p>
                        <span>{View_Data.enggine_no}</span>
                    </div>
        
                    <div className="user-details">
                        <p>Rto Name</p>
                        <span>{View_Data.rto}</span>
                    </div>
    
                    <div className="user-details">
                        <p>Registration No</p>
                        <span>{View_Data.reg_no}</span>
                    </div>
        
                    <div className="user-details">
                        <p>Registration Date</p>
                        <span>{View_Data.reg_dt}</span>
                    </div>
        
                    <div className="user-details">
                        <p>No Of Seats</p>
                        <span>{View_Data.no_of_seats}</span>
                    </div>
        
                    <div className="user-details">
                        <p>Fuel Type</p>
                        <span>{View_Data.fuel_type}</span>
                    </div>
        
                    <div className="user-details">
                        <p>Fuel Norms</p>
                        <span>{View_Data.fuel_norms}</span>
                    </div>
            
                    <div className="user-details">
                        <p>Maker</p>
                        <span>{View_Data.maker}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Vehicle Age</p>
                        <span>{View_Data.vehicle_age}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Vehicle Color</p>
                        <span>{View_Data.vehicle_color}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Body Type Desc</p>
                        <span>{View_Data.body_type_desc}</span>
                    </div>
                
                    <div className="user-details">
                        <p>State</p>
                        <span>{View_Data.state}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Financer Details</p>
                        <span>{View_Data.financer_details}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Policy No</p>
                        <span>{View_Data.policy_no}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Insurence Company</p>
                        <span>{View_Data.insurance_comp}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Insurence Upto</p>
                        <span>{View_Data.insUpto}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Puc No</p>
                        <span>{View_Data.puc_no}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Puc Upto</p>
                        <span>{View_Data.puc_upto}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Maker Model</p>
                        <span>{View_Data.maker_modal}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Fitness Upto</p>
                        <span>{View_Data.fitness_upto}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Source</p>
                        <span>{View_Data.source}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Manufacturer Month/Year</p>
                        <span>{View_Data.menufacturer_month_yr}</span>
                    </div>
                
                    <div className="user-details">
                        <p>GVW</p>
                        <span>{View_Data.gvw}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Cubic Cap</p>
                        <span>{View_Data.cubic_cap}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Sleeper Cap</p>
                        <span>{View_Data.sheeper_cap}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Stand Cap</p>
                        <span>{View_Data.stand_cap}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Wheelbase</p>
                        <span>{View_Data.wheelbase}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Permit No</p>
                        <span>{View_Data.permit_no}</span>
                    </div>
            
                    <div className="user-details">
                        <p>Permit Issue Date</p>
                        <span>{View_Data.permit_issue_date}</span>
                    </div>
            
                    <div className="user-details">
                        <p>Permit From</p>
                        <span>{View_Data.permit_from}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Permit Upto</p>
                        <span>{View_Data.permit_upto}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Permit Type</p>
                        <span>{View_Data.permit_type}</span>
                    </div>
                
                    <div className="user-details">
                        <p>RC NP no</p>
                        <span>{View_Data.rc_np_no}</span>
                    </div>
                
                    <div className="user-details">
                        <p>RC NP Upto</p>
                        <span>{View_Data.rc_np_upto}</span>
                    </div>
                
                    <div className="user-details">
                        <p>RC NP Issued By</p>
                        <span>{View_Data.rc_np_issued_by}</span>
                    </div>
                
                    <div className="user-details">
                        <p>RC Unld Wt</p>
                        <span>{View_Data.rc_unid_wt}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Blacklist Status</p>
                        <span>{View_Data.blacklist_status}</span>
                    </div>
                
                    <div className="user-details">
                        <p>NOC Details</p>
                        <span>{View_Data.noc_details}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Tax Upto</p>
                        <span>{View_Data.tax_upto}</span>
                    </div>
                
                    <div className="user-details">
                        <p>Status</p>
                        <span>{View_Data.status}</span>
                    </div>

                </Modal.Body>
            </Modal>
        </Layout>
    )
}

export default Rc_details