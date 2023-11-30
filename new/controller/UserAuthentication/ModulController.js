import Modules from "../../models/Modules.js"


export const createModule = async (req, res) => {
    let { module_name, module_url } = req.body
    try {
        const addModule = await Modules.create({
            module_name: module_name,
            module_url: module_url
        })
        if (addModule) {
            return res.json({
                status: true,
                response_code: 200,
                response_message: "Module Create!! ",
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            response_code: 500,
            response_message: "Something went wrong !!" + error.message,
        });
    }
}

