import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const mgsModel = sequelize.define("messages", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  from: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  to: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default mgsModel;
