import UserPermission from "../../models/Permission.js"


export const createPermission = async (req, res) => {
    let { display_name, name, guard_name, module_id } = req.body
    try {

        const permission = await UserPermission.findOrCreate({
            where: { display_name: display_name, name: name, module_id: module_id },
            defaults: { guard_name: guard_name },
        })
        if (permission[1]) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Permission create successfully!!! ",
            });
        } else {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Permission is Already Exist!!! ",
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            response_code: 500,
            response_message: "Something went wrong !!! " + error.message,
        });
    }
}
export const fetchPermission = async (req, res) => {
    // let { display_name, name, guard_name, module_id } = req.body
    try {

        const permission = await UserPermission.findAll({})
        if (permission) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Permission successfully!!! ",
                data: permission
            });
        } else {
            return res.json({
                status: false,
                response_code: 404,
                response_message: "Permission Not Exist!!! ",
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            response_code: 500,
            response_message: "Something went wrong !!! " + error.message,
        });
    }
}

export const deletePermisssion = async (req, res) => {
    try {
        const permission = await UserPermission.destroy({ where: { id: req?.params?.id } })
        if (permission == 1) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Permission successfully!!! ",
                data: permission
            });
        } else {
            return res.json({
                status: false,
                response_code: 500,
                response_message: "Error occured !!!",
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            response_code: 500,
            response_message: "Something went wrong!!!",
            error: error.message,
        });
    }
}