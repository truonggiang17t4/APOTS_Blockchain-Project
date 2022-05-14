var express = require('express');
const { MongoClient } = require("mongodb");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

//Khai báo đường dẫn vật lý
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));

//Cấu hình cho socket.io
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

//Cấu hình body-parser để nhận data json Post gửi lên
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Kết nối Mongodb
const mongoose = require('mongoose');
const { assert } = require("console");
const { callbackify } = require("util");
mongoose.connect('mongodb+srv://blockchain:blockchain@bc4supplychain.3d0m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err) {
    if (err) {
        console.log("Mongo connected error!" + err);
    } else {
        console.log("Mongo connected successfully !");
    }
});

const userRoutes = require('./routes/userRoutes')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/list', userRoutes)

//Run
require("./controllers/capstone1")(app);



