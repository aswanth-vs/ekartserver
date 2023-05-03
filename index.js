//automatically load env file to our app
require("dotenv").config();

//import express
const express = require("express");

//import cors
const cors = require("cors");

//import connection file
require("./db/connection");

//import router file
const router = require("./routes/router");

//create server
const server = express();

//to store port number
const PORT = 3000 || process.env.PORT;

//use in server app
server.use(cors());
server.use(express.json());
server.use(router);

//run app
server.listen(PORT, () => {
  console.log(`E-Kart server started at port ${PORT}`);
});
