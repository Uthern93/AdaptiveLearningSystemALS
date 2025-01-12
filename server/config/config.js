// config/config.js
module.exports = {
  development: {
    username: "root", // Replace with your MySQL username
    password: "", // Replace with your MySQL password
    database: "als", // Replace with your database name
    host: "127.0.0.1", // Replace with your MySQL host (localhost if it's on your machine)
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "",
    database: "als",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "",
    database: "als",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
