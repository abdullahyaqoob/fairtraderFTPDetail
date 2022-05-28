const express = require("express");
const cors = require("cors");
const axios = require('axios');
const app = express();
const db = require("./app/models");
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});



app.get("/", (req, res) => {
  axios.get('https://api.latoken.com/v2/ticker/FTP/USDT')
    .then(resp => {
      console.log(resp.data);
      res.send(resp.data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error in retrieving FTP Detail"
      });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on("SIGINT", async function () {
  console.log("SIGINT Shutdown received.");
  process.exit(0);
});

// //Terminate active connection on kill
process.on("SIGTERM", async function () {
  console.log("SIGTERM Shutdown received.");
  process.exit(0);
});
// set port, listen for requests
