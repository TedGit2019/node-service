const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require('./configuration/dataBase');
const baseRoutes = require('./routes/roures');
const app = express();

//连接mongodb
mongoose.connect(db.mongoURI)
    .then(() => console.log(`Mongodb connected to ${db.mongoURI}`))
    .catch(err => console.log(err));
    
//使用body-parser parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());

baseRoutes.forEach(route=>app.use(route.baseApi,route.controller))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})