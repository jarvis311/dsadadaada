import {
    Model,
    DataTypes
} from "sequelize";
import db from '../config/database.js'
import UserPermission from "./Permission.js";

class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
Modules.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    module_name: {
        type: DataTypes.STRING,
    },
    module_url: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: db.Vehicle,
    modelName: 'Modules',
    tableName: 'user_module',
    timestamps: false
});
export default Modules;

