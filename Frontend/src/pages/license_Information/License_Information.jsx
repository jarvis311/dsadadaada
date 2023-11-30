import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { SelectPicker } from "rsuite";
import { API } from "../../App";
import Layout from '../../layout/Layout';
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Pagination from "rc-pagination";

var Page_array = [];
var state_array = [];
const License_Information = () => {
    const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)

  const GetData = async () => {
    const result = await API.post("/api/license_info/Get_license_info", {}, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data.Data)
    PageGetData()
    setloading(false)
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

  useEffect(() => {
    GetData()
  }, [])

  const [show, setShow] = useState(false);
  const [View_Data, setView_Data] = useState({
    _id: "",
    license_no:"",
    dob:"",
    name:"",
    current_status:"",
    date_of_issue:"",
    last_transaction_at:"",
    old_new_dl_no:"",
    from_non_transport:"",
    to_non_transport:"",
    from_transport:"",
    to_transport:"",
    hazardous_valid_till:"",
    hill_vaild_till:"",
    cov_category:"",
    class_of_vehicle:"",
    cov_issue_date:"",
    blood_group:"",
    gender:"",
    citizen:""
})
  const handleShow = async (id) => {
    setShow(true)
    const Form = new FormData()
    Form.append('id', id)
    const result = await API.post("/api/license_info/Get_license_info_ID", Form, { headers: { Authorization: `Bearer ${token}` } })
    setView_Data({
    _id: result.data.Data[0]._id,
    license_no:result.data.Data[0].license_no,
    dob:result.data.Data[0].dob,
    name:result.data.Data[0].name,
    current_status:result.data.Data[0].current_status,
    date_of_issue:result.data.Data[0].date_of_issue,
    last_transaction_at:result.data.Data[0].last_transaction_at,
    old_new_dl_no:result.data.Data[0].old_new_dl_no,
    from_non_transport:result.data.Data[0].from_non_transport,
    to_non_transport:result.data.Data[0].to_non_transport,
    from_transport:result.data.Data[0].from_transport,
    to_transport:result.data.Data[0].to_transport,
    hazardous_valid_till:result.data.Data[0].hazardous_valid_till,
    hill_vaild_till:result.data.Data[0].hill_vaild_till,
    cov_category:result.data.Data[0].cov_category,
    class_of_vehicle:result.data.Data[0].class_of_vehicle,
    cov_issue_date:result.data.Data[0].cov_issue_date,
    blood_group:result.data.Data[0].blood_group,
    gender:result.data.Data[0].gender,
    citizen:result.data.Data[0].citizen
    })
}
const handleClose = () => setShow(false);

const [query, setquery] = useState({
    search:""
})

const searching = async(e , name) =>{
if(name == "search"){
    setquery({...query , [name] : e.target.value})
}
const Form = new FormData();
Form.append("search", name == "search" ? e.target.value : query.search);
const result = await API.post("/api/license_info/searching_license_info", Form, { headers: { Authorization: `Bearer ${token}` } });
setData(result.data.Data);

};

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">License Information</h3>
        <div className="page-heading-right">
          <Form.Control
            type="text"
            name="reg_no"
            placeholder=" Serach License No."
            className="wv-200 my-1 ms-3"
            onChange={(e) => searching(e , "search")}
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
                      <th width="18%">License No</th>
                      <th width="19%">Owner Name</th>
                      <th width="12%">Current Status</th>
                      <th width="12%">Date of Issue</th>
                      <th width="12%">Valid Till</th>
                      <th width="12%">Date</th>
                      <th width="10%" className="text-center">Show Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        return (
                          <tr key={i}>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.license_no}</td>
                            <td>{val.name}</td>
                            <td>{val.current_status}</td>
                            <td>{dayjs(val?.date_of_issue).format('DD-MM-YYYY')}</td>
                            <td>{dayjs(val?.to_non_transport).format('DD-MM-YYYY')}</td>
                            <td>{dayjs(val?.date).format('DD-MM-YYYY')}</td>
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
                          <p>No Found License Information</p>
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
              <span>{View_Data.name}</span>
            </div>
            <div className="user-details">
              <p>License No</p>
              <span>{View_Data.license_no}</span>
            </div>
            <div className="user-details">
              <p>DOB</p>
              <span>{dayjs(View_Data?.dob).format('DD-MM-YYYY')}</span>
            </div>
            <div className="user-details">
              <p>Current Status</p>
              <span>{View_Data.current_status}</span>
            </div>
            <div className="user-details">
                <p>Date Of Issue</p>
                <span>{dayjs(View_Data?.date).format('DD-MM-YYYY')}</span>
            </div>
            <div className="user-details">
              <p>Last Transaction At</p>
              <span>{View_Data.last_transaction_at}</span>
            </div>
            <div className="user-details">
              <p>Old New DL No</p>
              <span>{View_Data.old_new_dl_no}</span>
            </div>
            <div className="user-details">
              <p>From Non Transport</p>
              <span>{View_Data.from_non_transport}</span>
            </div>
            <div className="user-details">
              <p>To Non Transport</p>
              <span>{dayjs(View_Data?.to_non_transport).format('DD-MM-YYYY')}</span>
            </div>
            <div className="user-details">
              <p>From Transport</p>
              <span>{dayjs(View_Data?.from_transport).format('DD-MM-YYYY')}</span>
            </div>
            <div className="user-details">
              <p>To Transport</p>
              <span>{dayjs(View_Data?.to_transport).format('DD-MM-YYYY')}</span>
            </div>
            <div className="user-details">
              <p>Hazardous Valid Till</p>
              <span>{View_Data.hazardous_valid_till}</span>
            </div>
            <div className="user-details">
              <p>Hill Valid Till</p>
              <span>{View_Data.hill_vaild_till}</span>
            </div>
            <div className="user-details">
              <p>Cov Category</p>
              <span>{View_Data.cov_category}</span>
            </div>
            <div className="user-details">
              <p>Class Of Vehicle</p>
              <span>{View_Data.class_of_vehicle}</span>
            </div>
            <div className="user-details">
              <p>Cov Issue Date</p>
              <span>{View_Data.cov_issue_date}</span>
            </div>
          </Modal.Body>
      </Modal>
    </Layout>
  )
}

export default License_Information