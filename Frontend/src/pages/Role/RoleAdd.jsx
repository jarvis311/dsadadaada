import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Cookies from "js-cookie";
import Layout from "../../layout/Layout";

const RoleAdd = () => {
  const token = Cookies.get("fmljwt");
  const navigate = useNavigate();
  const [validated, setvalidated] = useState(false)
  const [loadData, setloadData] = useState(false)
  const [permission, setPermission] = useState([])
  const [inpData, setInpData] = useState({
    name: "",
    permission: []
  })

  const getData = async () => {
    const res = await API.post("/api/rolePermission/get/permission", {}, { headers: { Authorization: `Bearer ${token}` } })
    setPermission(res.data.Data)
    setloadData(true)
    console.log('res >>>>> ----', res)
  }
  const permissionGroup = permission

  //  ******************** 1 ************************
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedGroup1, setSelectedGroup1] = useState([]);
  const [selectedGroup2, setSelectedGroup2] = useState([]);
  const [selectedGroup3, setSelectedGroup3] = useState([]);
  const [selectedGroup4, setSelectedGroup4] = useState([]);
  const [selectedGroup5, setSelectedGroup5] = useState([]);
  const [selectedGroup6, setSelectedGroup6] = useState([]);
  const [selectedGroup7, setSelectedGroup7] = useState([]);
  const [selectedGroup8, setSelectedGroup8] = useState([]);
  const [selectedGroup9, setSelectedGroup9] = useState([]);
  const [selectedGroup10, setSelectedGroup10] = useState([]);
  const [selectedGroup11, setSelectedGroup11] = useState([]);
  const [selectedGroup12, setSelectedGroup12] = useState([]);

  const handleGroupCheckbox = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('rc_details') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup(allIds);
    } else {
      setSelectedGroup([]);
    }
  };

  // *************** 2 
  const handleGroupCheckbox1 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup1((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup1((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll1 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('rc_count') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup1(allIds);
    } else {
      setSelectedGroup1([]);
    }
  };

  // ****************** 3
  const handleGroupCheckbox2 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup2((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup2((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll2 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('rc_block') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup2(allIds);
    } else {
      setSelectedGroup2([]);
    }
  };

  // ****************** 4
  const handleGroupCheckbox3 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup3((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup3((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll3 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('license_Information') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup3(allIds);
    } else {
      setSelectedGroup3([]);
    }
  };

  // ****************** 5
  const handleGroupCheckbox4 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup4((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup4((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll4 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('qoutes') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup4(allIds);
    } else {
      setSelectedGroup4([]);
    }
  };

  // ****************** 6

  const handleGroupCheckbox5 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup5((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup5((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll5 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('CarInfo') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup5(allIds);
    } else {
      setSelectedGroup5([]);
    }
  };

  // ****************** 7

  const handleGroupCheckbox6 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup6((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup6((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll6 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('fail_data') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup6(allIds);
    } else {
      setSelectedGroup6([]);
    }
  };

  // ****************** 8

  const handleGroupCheckbox7 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup7((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup7((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll7 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('rc_reminder') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup7(allIds);
    } else {
      setSelectedGroup7([]);
    }
  };

  // ****************** 9

  const handleGroupCheckbox8 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup8((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup8((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll8 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('rc_feedback') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup8(allIds);
    } else {
      setSelectedGroup8([]);
    }
  };

  // ****************** 10

  const handleGroupCheckbox9 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup9((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup9((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll9 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('notification_report') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup9(allIds);
    } else {
      setSelectedGroup9([]);
    }
  };

  // ****************** 11

  const handleGroupCheckbox10 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup10((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup10((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll10 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('app_update') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup10(allIds);
    } else {
      setSelectedGroup10([]);
    }
  };

  // ****************** 12

  const handleGroupCheckbox11 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup11((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup11((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll11 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('proxy') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup11(allIds);
    } else {
      setSelectedGroup11([]);
    }
  };

  // ****************** 13

  const handleGroupCheckbox12 = (e, id) => {
    if (e.target.checked) {
      setSelectedGroup12((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedGroup12((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCheckAll12 = (isChecked) => {
    console.log('isChecked', isChecked)
    if (isChecked) {
      const allIds = permissionGroup.map((val) =>
        val.name.startsWith('API_Priority') ? val._id : false
      ).filter((IDS) => IDS !== false);
      setSelectedGroup12(allIds);
    } else {
      setSelectedGroup12([]);
    }
  };

  const submitData = async () => {
    console.log('inpData.name', inpData.name)
    const selectedGroups = [
      selectedGroup,
      selectedGroup1,
      selectedGroup2,
      selectedGroup3,
      selectedGroup4,
      selectedGroup5,
      selectedGroup6,
      selectedGroup7,
      selectedGroup8,
      selectedGroup9,
      selectedGroup10,
      selectedGroup11,
      selectedGroup12,
    ];
    const hasSelectedGroups = selectedGroups.some((group) => group && group.length > 0);
    setvalidated(false);
    if (inpData.name === "") {
      setvalidated(true);
    }
    else if (!hasSelectedGroups) {
      setvalidated(true);
      return;
    }
    else {
      const Form = new FormData();
      let MainArray = []
      Form.append('name', inpData.name);
      if (selectedGroup.length !== 0 || selectedGroup1.length !== 0 || selectedGroup2.length !== 0 || selectedGroup3.length !== 0 || selectedGroup4.length !== 0 || selectedGroup5.length !== 0
        || selectedGroup6.length !== 0 || selectedGroup7.length !== 0 || selectedGroup8.length !== 0 || selectedGroup9.length !== 0 || selectedGroup10.length !== 0
        || selectedGroup11.length !== 0 || selectedGroup12.length !== 0) {
        selectedGroup.map((val) => {
          MainArray.push(val)
        })
        selectedGroup1.map((val) => {
          MainArray.push(val)
        })
        selectedGroup2.map((val) => {
          MainArray.push(val)
        })
        selectedGroup3.map((val) => {
          MainArray.push(val)
        })
        selectedGroup4.map((val) => {
          MainArray.push(val)
        })
        selectedGroup5.map((val) => {
          MainArray.push(val)
        })
        selectedGroup6.map((val) => {
          MainArray.push(val)
        })
        selectedGroup7.map((val) => {
          MainArray.push(val)
        })
        selectedGroup8.map((val) => {
          MainArray.push(val)
        })
        selectedGroup9.map((val) => {
          MainArray.push(val)
        })
        selectedGroup10.map((val) => {
          MainArray.push(val)
        })
        selectedGroup11.map((val) => {
          MainArray.push(val)
        })
        selectedGroup12.map((val) => {
          MainArray.push(val)
        })
        Form.append('permission', JSON.stringify(MainArray));
      }
      else if (selectedGroup.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup));
      }
      else if (selectedGroup1.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup1));
      }
      else if (selectedGroup2.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup2));
      }
      else if (selectedGroup3.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup3));
      }
      else if (selectedGroup4.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup4));
      }
      else if (selectedGroup5.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup5));
      }
      else if (selectedGroup6.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup6));
      }
      else if (selectedGroup7.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup7));
      }
      else if (selectedGroup8.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup8));
      }
      else if (selectedGroup9.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup9));
      }
      else if (selectedGroup10.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup10));
      }
      else if (selectedGroup11.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup11));
      }
      else if (selectedGroup12.length !== 0) {
        Form.append('permission', JSON.stringify(selectedGroup12));
      }
      const res = await API.post("/api/rolePermission/add/role", Form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        toast.success("Module Created Successfully");
        navigate("/Role");
      }
    }

  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Layout sidebar={true}>
        <div className="page-heading">
          <h3>Create Role</h3>
          <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
            <Breadcrumb.Item>
              <Link to="/home">
                <i className="bx bx-home-alt me-2 fs-5"></i> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/Role">Role List</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Role</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="page-content">
          <Form noValidate validated={validated}>
            <Row>
              <Col xs={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <Form.Label htmlFor="name">Role</Form.Label>
                        <Form.Control type="text" className="my-2" name="name" onChange={(e) => { setInpData({ ...inpData, ['name']: e.target.value.trim() }) }} required />
                        <Form.Control.Feedback type="invalid">
                          Name Field Is Require
                        </Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <Form.Label htmlFor="name" className="fw-600 my-2">Permissions</Form.Label>
                        {
                          console.log('>>>>>>>', selectedGroup.length > 0)
                        }
                      </Col>
                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup.length == permissionGroup.filter(x => x.name.startsWith('rc_details')).length}
                            onChange={(e) => handleCheckAll(e.target.checked)}
                            label="All RC Details"
                            required={selectedGroup.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {permissionGroup.map((val, ind) => {
                        if (val.name.startsWith('rc_details')) {
                          return (
                            <Col md={3} key={ind}>
                              <Form.Check
                                type="checkbox"
                                checked={selectedGroup.includes(val._id)}
                                className="my-2"
                                id={val._id}
                                label={val.name}
                                onChange={(e) => handleGroupCheckbox(e, val._id)}
                                required
                              />
                            </Col>
                          );
                        }
                      })}
                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup1.length == permissionGroup.filter(x => x.name.startsWith("rc_count")).length}
                            onChange={(e) => handleCheckAll1(e.target.checked)}
                            label="All RC Count"
                            required={selectedGroup1.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permissionGroup.map((val, ind) => {
                          if (val.name.startsWith("rc_count")) {
                            return (
                              <Col md={3} key={ind}>
                                <Form.Check
                                  type="checkbox"
                                  checked={selectedGroup1.includes(val._id)}
                                  className="my-2"
                                  id={val._id}
                                  label={val.name}
                                  onChange={(e) => handleGroupCheckbox1(e, val._id)}
                                  required
                                />
                              </Col>
                            );
                          }
                        })
                      }
                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup2.length == permissionGroup.filter(x => x.name.startsWith("rc_block")).length}
                            label="All RC Block"
                            onChange={(e) => handleCheckAll2(e.target.checked)}
                            required={selectedGroup2.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('rc_block')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup2.includes(val._id)} id={val._id} label={val.name} onChange={(e) => handleGroupCheckbox2(e, val._id)} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup3.length == permissionGroup.filter(x => x.name.startsWith("license_Information")).length}
                            label="All License Information"
                            onChange={(e) => handleCheckAll3(e.target.checked)}
                            required={selectedGroup3.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('license_Information')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup3.includes(val._id)} id={val._id} label={val.name} onChange={(e) => handleGroupCheckbox3(e, val._id)} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup4.length == permissionGroup.filter(x => x.name.startsWith("qoutes")).length}
                            label="All Qoutes"
                            onChange={(e) => handleCheckAll4(e.target.checked)}
                            required={selectedGroup4.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('qoutes')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup4.includes(val._id)} onChange={(e) => handleGroupCheckbox4(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }
                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup5.length == permissionGroup.filter(x => x.name.startsWith("CarInfo")).length}
                            label="All CarInfo"
                            onChange={(e) => handleCheckAll5(e.target.checked)}
                            required={selectedGroup5.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('CarInfo')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup5.includes(val._id)} onChange={(e) => handleGroupCheckbox5(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            label="All Fail Data"
                            checked={selectedGroup6.length == permissionGroup.filter(x => x.name.startsWith("fail_data")).length}
                            onChange={(e) => handleCheckAll6(e.target.checked)}
                            required={selectedGroup6.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('fail_data')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup6.includes(val._id)} onChange={(e) => handleGroupCheckbox6(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup7.length == permissionGroup.filter(x => x.name.startsWith("rc_reminder")).length}
                            label="All RC Reminder"
                            onChange={(e) => handleCheckAll7(e.target.checked)}
                            required={selectedGroup7.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('rc_reminder')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup7.includes(val._id)} onChange={(e) => handleGroupCheckbox7(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup8.length == permissionGroup.filter(x => x.name.startsWith("rc_feedback")).length}
                            label="All RC Feedback"
                            onChange={(e) => handleCheckAll8(e.target.checked)}
                            required={selectedGroup8.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('rc_feedback')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup8.includes(val._id)} onChange={(e) => handleGroupCheckbox8(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup9.length == permissionGroup.filter(x => x.name.startsWith("notification_report")).length}
                            label="All Notification report"
                            onChange={(e) => handleCheckAll9(e.target.checked)}
                            required={selectedGroup9.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('notification_report')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup9.includes(val._id)} onChange={(e) => handleGroupCheckbox9(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup10.length == permissionGroup.filter(x => x.name.startsWith("app_update")).length}
                            label="All App Updates"
                            onChange={(e) => handleCheckAll10(e.target.checked)}
                            required={selectedGroup10.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('app_update')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup10.includes(val._id)} onChange={(e) => handleGroupCheckbox10(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup11.length == permissionGroup.filter(x => x.name.startsWith("proxy")).length}
                            label="All Proxy"
                            onChange={(e) => handleCheckAll11(e.target.checked)}
                            required={selectedGroup11.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('proxy')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup11.includes(val._id)} onChange={(e) => handleGroupCheckbox11(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }

                      <Col md={12}>
                        {
                          loadData == true &&
                          <Form.Check
                            type="checkbox"
                            className="my-2"
                            checked={selectedGroup12.length == permissionGroup.filter(x => x.name.startsWith("API_Priority")).length}
                            label="All API Priority"
                            onChange={(e) => handleCheckAll12(e.target.checked)}
                            required={selectedGroup12.length <= 0 ? true : false}
                          />
                        }
                      </Col>
                      {
                        permission.map((val, ind) => {
                          if (val.name.startsWith('API_Priority')) {
                            return (
                              <>
                                <Col md={3} key={ind}>
                                  <Form.Check type="checkbox" className="my-2" checked={selectedGroup12.includes(val._id)} onChange={(e) => handleGroupCheckbox12(e, val._id)} id={val._id} label={val.name} required />
                                </Col>
                              </>
                            )
                          }
                        })
                      }
                    </Row>
                  </Card.Body>
                  <Card.Footer className="text-end">
                    <Button variant="primary" className="me-3" onClick={submitData}>
                      Save
                    </Button>
                    <Link to="/Role">
                      <Button variant="secondary">Cancle</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </Layout >
    </>
  )
}

export default RoleAdd