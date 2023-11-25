import { DataTypes } from "sequelize";
import sequelize from "./db";

const File = sequelize.define("File", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default File
