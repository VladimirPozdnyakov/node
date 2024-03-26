import { Sequelize } from "sequelize";
import "dotenv/config.js";
import logger from "../logger/index.js";

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: "sql11.freemysqlhosting.net",
    dialect: "mysql",
  }
);

// User
const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(50),
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING(50),
    defaultValue: "user",
  },
});

// Entry
const Entry = sequelize.define("posts", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
});

export default { User, Entry, sequelize };
