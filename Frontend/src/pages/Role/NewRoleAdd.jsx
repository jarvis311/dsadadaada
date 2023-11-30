import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Cookies from "js-cookie";
import Layout from "../../layout/Layout";

const NewRoleAdd = () => {
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

    const Checkbox = ({ id, label, checked, onChange }) => (
        <Col md={3}>
            <Form.Check
                type="checkbox"
                checked={checked}
                className="my-2"
                id={id}
                label={label}
                onChange={onChange}
                required
            />
        </Col>
    );

    const PermissionCheckboxGroup = ({ permissionGroup, selectedGroup, onChangeAll, onChangeGroup }) => {
        const operationMap = {};

        // Group permissions based on common names
        permissionGroup.forEach((val) => {
            const commonName = val.name.replace(/(Cretae|Edit|Delete)\s*$/, '').trim();
            if (!operationMap[commonName]) {
                operationMap[commonName] = [];
            }
            operationMap[commonName].push(val);
        });

        return (
            <>
                <Col md={12}>
                    <Form.Check
                        type="checkbox"
                        className="my-2"
                        checked={selectedGroup.length === permissionGroup.length}
                        onChange={(e) => onChangeAll(e.target.checked)}
                        label="All Permissions"
                        required={selectedGroup.length <= 0}
                    />
                </Col>
                {Object.entries(operationMap).map(([commonName, permissions]) => (
                    <React.Fragment key={commonName}>
                        <Col md={12} className="mb-3">
                            <strong>{commonName}</strong>
                        </Col>
                        {permissions.map((permission) => (
                            <Checkbox
                                key={permission._id}
                                id={permission._id}
                                label={permission.name}
                                checked={selectedGroup.includes(permission._id)}
                                onChange={(e) => onChangeGroup(e, permission._id)}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </>
        );
    };



    const handleGroupCheckbox = (e, id) => {
        setSelectedGroup((prevSelected) => (
            e.target.checked
                ? [...prevSelected, id]
                : prevSelected.filter((selectedId) => selectedId !== id)
        ));
    };

    const handleCheckAll = (isChecked) => {
        const allIds = permissionGroup.map((val) => val._id);
        setSelectedGroup(isChecked ? allIds : []);
    };
    console.log('selectedGroup >>>>>', selectedGroup)
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
                <PermissionCheckboxGroup
                    permissionGroup={permissionGroup}
                    selectedGroup={selectedGroup}
                    onChangeAll={handleCheckAll}
                    onChangeGroup={handleGroupCheckbox}
                />
            </Layout >
        </>
    )
}

export default NewRoleAdd