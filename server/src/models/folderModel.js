import { DataTypes } from "sequelize";
import sequelize from "./db";

const Folder = sequelize.define("Folder", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Folder;
