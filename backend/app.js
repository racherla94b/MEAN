const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const Word = require("./models/word");
const User = require("./models/user");
const UploadFile = require("./models/upload");
const ShortWord = require("./models/shortword");

const wordRoutes = require("./routes/dublinwords");
const transformRoutes = require("./routes/transformfiles");
const userRoutes = require("./routes/userdata.js");
const indexRoutes = require("./routes/indexdata.js");

let mongoString = "mongodb+srv://saiAkash:pC1mOf13yPPCxJYH@ecprojectcluster-4qtsx.mongodb.net/ec-project?retryWrites=true";
let localMongo = "mongodb://localhost:27017/ec-project"

mongoose.connect(localMongo, {useNewUrlParser: true})
		.then(() => {
			console.log("Connected to Database");
		})
		.catch(() => {
			console.log("Connection Failed");
		});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/uploads", express.static(path.join("backend/uploads")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

	next();
});

app.use('/word', wordRoutes);
app.use('/transform', transformRoutes);
app.use('/auth', userRoutes); //http:localhost:3000/auth/signup
app.use('/index', indexRoutes);

module.exports = app;
