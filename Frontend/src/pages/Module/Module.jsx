import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../../App";
import Swal from "sweetalert2";
import $ from "jquery";
import Cookies from "js-cookie";
import Pagination from "rc-pagination";
import Layout from "../../layout/Layout";

var Page_array = [];
const Module = () => {
  const token = Cookies.get("fmljwt");
  const [Data, setData] = useState([])
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [PageHook, setPageHook] = useState([])
  const [loading, setloading] = useState(true)
  const GetData = async () => {
    const result = await API.post("/api/modulePermission/Get_ModuleController", {}, { headers: { Authorization: `Bearer ${token}` } })
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



  let count = 10
  let swalCountdownInterval
  const DeleteData = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger btn-lg counter",
        cancelButton: "btn btn-primary btn-lg me-3",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want to delete?",
        text: "You won't be able to revert this!",
        imageUrl: '../../icon/alert.svg',
        imageWidth: 80,
        imageHeight: 80,
        confirmButtonText: "OK (10)",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        reverseButtons: true,
        didOpen: () => {
          $(".swal2-confirm").attr('disabled', true);
          swalCountdownInterval = setInterval(function () {
            count--
            if (count < 1) {
              $(".counter").text(`OK`)
              $(".swal2-confirm").attr('disabled', false);
              clearInterval(swalCountdownInterval)
            } else {
              $(".counter").text(`OK (${count})`)
            }
          }, 1000);
        }
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const form = new FormData()
          form.append('id', id)
          await API.post(`/api/modulePermission/Delete_ModuleController`, form, { headers: { Authorization: `Bearer ${token}` } });
          GetData();
        } else {
          count = 10
          clearInterval(swalCountdownInterval)
        }
      });
  };

  useEffect(() => {
    GetData()
  }, [])
  return (
    <>
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">Module</h3>
        <div className="page-heading-right">
            <Link to="/Add/module" className="my-1 ms-3">
              <Button variant="primary" value="create">
                Add New
              </Button>
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
                      <th width="5%">
                        <div className="table-sort-filter justify-content-center">
                          No
                        </div>
                      </th>
                      <th width="55%">
                        <div className="table-sort-filter">
                          Name
                        </div>
                      </th>
                      <th width="30%" >Route</th>
                      <th width="10%" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    getData1(current, size).map((val, i) => {
                      return (
                        <tr key={i}>
                          <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                          <td>{val.name}</td>
                          <td>{val.route}</td>
                          <td className='text-center'>
                            <Link to={`/view/module/${val._id}`}>
                            <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                            </Link>
                            <Button variant="outline-danger" onClick={() => DeleteData(val._id)} size="sm" className="btn-icon"><i className='bx bx-trash-alt' ></i></Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                  {
                 loading ==false && Data.length === 0 ? <tr>
                    <td colSpan="100%" className="p-0">
                      <div className='no-found'>
                        <img src="../../not-found/image.svg" />
                        <p>No Found Module</p>
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
    </>
  )
}


export default Module