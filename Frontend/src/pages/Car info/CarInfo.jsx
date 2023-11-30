import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { SelectPicker } from "rsuite";
import { API } from "../../App";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Layout from '../../layout/Layout';
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Pagination from "rc-pagination";

var Page_array = [];
const CraInfo = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)
  const [query, setquery] = useState({
    live:""
  })
  const GetData = async () => {
    const result = await API.post("/api/car_info/Get_create_carinfo_rc", {}, { headers: { Authorization: `Bearer ${token}` } })
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

  const CarinfoSearch = async(e , name)=>{
    if(name==="live"){
      setquery({ ...query, [name]: e.target.value });
    }
   const Form = new FormData();
   Form.append('live',name=='live'?e.target.value:query.live)
   const result = await API.post("/api/car_info/search_carinfo_rc", Form, { headers: { Authorization: `Bearer ${token}` } })
    setData(result.data)
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">CarInfo RC Count</h3>
        <div className="page-heading-right">
        <DateRangePicker opens="right" onApply={(e)=>{CarinfoSearch(e,"live")}} onCancel={(e)=>{e.target.name='live';e.target.value="";CarinfoSearch(e,"live")}}>
            <input type="text" name="live" value={query.live} placeholder="Select Date" className="form-control wv-225 my-1 ms-3 " />
        </DateRangePicker>
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
                      <tr className="text-center">
                          <th rowSpan="2">No</th>
                          <th rowSpan="2">Date</th>
                          <th colSpan="3" className="bg1">RTO to CarInfo</th>
                          <th colSpan="3" className="bg2">CarInfo to RTO</th>
                      </tr>
                      <tr className="text-center">
                          <th className="bg1">Success</th>
                          <th className="bg1">Fail</th>
                          <th className="bg1">Total</th>
                          <th className="bg2">Success</th>
                          <th className="bg2">Fail</th>
                          <th className="bg2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    getData1(current, size).map((val, i) => {
                      return (
                      <tr key={i} className="text-center">
                        <td width="1%"> {(current === 1) ? i + 1 : current * size + i + 1 - size} </td>
                        <td width="5%">{dayjs(val.date).format('YYYY-MM-DD')}</td>
                        <td width="5%" className="bg1">{val.rto_to_carinfo_success}</td>
                        <td width="5%" className="bg1">{val.rto_to_carinfo_fail}</td>
                        <td width="5%" className="bg1">{val.rto_to_carinfo_success + val.rto_to_carinfo_fail}</td>
                        <td width="5%" className="bg2">{val.carinfo_to_rto_success}</td>
                        <td width="5%" className="bg2">{val.carinfo_to_rto_fail}</td>
                        <td width="5%" className="bg2">{val.carinfo_to_rto_success + val.carinfo_to_rto_fail}</td>
                      </tr>
                      )
                    })
                  }
                  {
                    Data.length != 0 ?
                      <tr className="text-center">
                        <td colSpan="2" className="fw-600">Total Record Of API Calling</td>
                        <td className="fw-600 bg1">{Data.reduce((total, val) => total + val.rto_to_carinfo_success, 0)}</td>
                        <td className="fw-600 bg1">{Data.reduce((total, val) => total + val.rto_to_carinfo_fail, 0)}</td>
                        <td className="fw-600 bg1">{Data.reduce((total, val) => total + val.rto_to_carinfo_success + val.rto_to_carinfo_fail, 0)}</td>
                        <td className="fw-600 bg2">{Data.reduce((total, val) => total + val.carinfo_to_rto_success, 0)}</td>
                        <td className="fw-600 bg2">{Data.reduce((total, val) => total + val.carinfo_to_rto_fail, 0)}</td>
                        <td className="fw-600 bg2">{Data.reduce((total, val) => total + val.carinfo_to_rto_success + val.carinfo_to_rto_fail, 0)}</td>
                      </tr>:""
                  }
                    </tbody>
                    {
                    loading ==false && Data.length === 0 ? <tr>
                      <td colSpan="100%" className="p-0">
                        <div className='no-found'>
                          <img src="../../not-found/image.svg" />
                          <p>No Found CarInfo RC Count</p>
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

export default CraInfo