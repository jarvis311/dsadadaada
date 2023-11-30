import Modules from "../../models/Modules.js";
import UserPermission from "../../models/Permission.js";
import RoleHasPermission from "../../models/RoleHasPermission.js";
import Roles from "../../models/Roles.js";
import UserAuth from "../../models/UserAuth.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const userSignIn = async (req, res) => {
    let { email, password } = req.body
    try {
        if (email) {
            const checkEmailIsRegistred = await UserAuth.findOne({ where: { email: email } })
            if (!checkEmailIsRegistred) {
                return res.json({
                    status: false,
                    response_code: 404,
                    response_message: "This email not registred!! ",
                });
            } else {
                const matchPassword = await bcrypt.compare(password, checkEmailIsRegistred.dataValues.password);
                if (matchPassword) {
                    delete checkEmailIsRegistred.dataValues.remember_token
                    delete checkEmailIsRegistred.dataValues.password

                    const refreshToken = jwt.sign({ payload: JSON.stringify(checkEmailIsRegistred) }, process.env.TOKEN_SECRET, { expiresIn: "24h" },)

                    checkEmailIsRegistred.dataValues.token = refreshToken
                    try {
                        const updateUserRefreshToken = await UserAuth.update({ remember_token: refreshToken }, { where: { id: checkEmailIsRegistred.dataValues.id } })

                        const findUserPermission = await RoleHasPermission.findAll({
                            where: { role_id: checkEmailIsRegistred.dataValues.user_type },
                            include: [
                                {
                                    model: UserPermission,
                                    as: "UserHasPermission",
                                    attributes: ['id', 'display_name', 'name', 'module_id'],
                                    include: [
                                        { model: Modules, as: "ModuleName" }
                                    ]
                                }
                            ]
                        })
                        const groupedPermissions = findUserPermission.reduce((acc, permission) => {
                            const moduleName = permission.UserHasPermission.ModuleName.module_name;
                            const display_name = permission.UserHasPermission.display_name;

                            if (!acc[moduleName]) {
                                acc[moduleName] = {};
                            }

                            if (!acc[moduleName][display_name]) {
                                acc[moduleName][display_name] = [];
                            }

                            acc[moduleName][display_name].push({
                                "id": permission.id,
                                "display_name": display_name,
                                "name": permission.UserHasPermission.name,
                                "module_id": permission.UserHasPermission.module_id
                            });

                            return acc;
                        }, {});

                        const moduleWithPemission = Object.entries(groupedPermissions).map(([moduleName, permissions]) => {
                            const modulePermissions = Object.entries(permissions).map(([display_name, details]) => {
                                return {
                                    [display_name]: details
                                };
                            });

                            return {
                                [moduleName]: modulePermissions
                            };
                        });
                        if (findUserPermission) {
                            checkEmailIsRegistred.dataValues.userPermission = moduleWithPemission
                        }

                        if (updateUserRefreshToken) {
                            return res.json({
                                status: true,
                                response_code: 200,
                                response_message: "This User Login succesfully!! ",
                                data: checkEmailIsRegistred
                            });
                        } else {
                            return res.json({
                                status: false,
                                response_code: 500,
                                response_message: "Token not updated!! ",
                                // data: checkEmailIsRegistred
                            });
                        }
                    } catch (error) {
                        return res.json({
                            status: false,
                            response_code: 500,
                            response_message: error.message,
                            // data: checkEmailIsRegistred
                        });
                    }
                } else {
                    return res.json({
                        status: false,
                        response_code: 401,
                        response_message: "Email or password not match! Try Again!! ",
                    });
                }
            }
        }
    } catch (error) {
        return res.json({
            status: false,
            response_code: 500,
            response_message: "Something went wrong!!! ",
        });
    }
}


export const getAllPRotectedRouts = async (req, res) => {
    try {
        if (req.role != 1) {
            let allPermitData = {}
            allPermitData['type'] = 2
            allPermitData['name'] = req.role

            // const moduleData = await WebModule.find()
            // moduleData.map((data) => {
            //     allPermitData[data.name] = []
            // })
            // console.log('req.role --->>>>', req.role)
            // const permissionData = await RoleHasPermission.findAll({ where: { role_id: req.role } })

            // console.log('permissionData >>>>', permissionData)
            // res.send(permissionData)



            const findUserPermission = await RoleHasPermission.findAll({
                where: { role_id: req.role },
                include: [
                    {
                        model: UserPermission,
                        as: "UserHasPermission",
                        attributes: ['id', 'display_name', 'name', 'module_id'],
                        include: [
                            { model: Modules, as: "ModuleName" }
                        ]
                    }
                ]
            })
            const groupedPermissions = findUserPermission.reduce((acc, permission) => {
                const moduleName = permission.UserHasPermission.ModuleName.module_name;
                const display_name = permission.UserHasPermission.display_name;

                if (!acc[moduleName]) {
                    acc[moduleName] = {};
                }

                if (!acc[moduleName][display_name]) {
                    acc[moduleName][display_name] = [];
                }

                acc[moduleName][display_name].push({
                    "id": permission.id,
                    "display_name": display_name,
                    "name": permission.UserHasPermission.name,
                    "module_id": permission.UserHasPermission.module_id
                });

                return acc;
            }, {});

            const moduleWithPemission = Object.entries(groupedPermissions).map(([moduleName, permissions]) => {
                const modulePermissions = Object.entries(permissions).map(([display_name, details]) => {
                    return {
                        [display_name]: details
                    };
                });

                return {
                    [moduleName]: modulePermissions
                };
            });




            res.send(moduleWithPemission)
            return
            Promise.all(
                permissionData.map(async (val) => {
                    const perData = await UserPermission.findOne({ id: val.permission_id })
                    let newArr = allPermitData[perData.module_id.name]
                    newArr.push(perData.permission)
                    allPermitData[perData.module_id.name] = newArr
                })
            ).then(async () => {
                res.json({
                    status: true,
                    response_code: 200,
                    response_message: "User Verified Successfully",
                    data: allPermitData
                });
            })
            // } else if (req.type != "user") {
            //     let allPermitData = {}
            //     allPermitData['type'] = 1
            //     allPermitData['name'] = "Admin"
            //     const moduleData = await WebModule.find()
            //     moduleData.map((data) => {
            //         allPermitData[data.name] = [1, 2, 3, 4]
            //     })
            //     res.json({
            //         status: true,
            //         response_code: 200,
            //         response_message: "Admin Verified Successfully",
            //         data: allPermitData
            //     });
            // } else {
            // let allPermitData = {}
            // const moduleData = await WebModule.find()
            // moduleData.map((data) => {
            //     allPermitData[data.name] = []
            // })
            // res.json({
            //     status: true,
            //     response_code: 200,
            //     response_message: "User Verification Failed",
            //     data: allPermitData
            // });
        }
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            response_code: 401,
            response_message: "something went wrong",
        });
    }
}