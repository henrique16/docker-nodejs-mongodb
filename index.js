require('dotenv').config();
const express = require("express"),
    morgan = require("morgan"),
    con = require("./config/dbConnection"),
    expressLayouts = require("express-ejs-layouts"),
    handleRoutes = require("./route/index"),
    bodyParser = require("body-parser"),
    port = process.env.PORT,
    app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
    next();
});
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("pages/home");
});

handleRoutes(app);

app.listen(port, () => {
    con();
    console.log(`http://localhost:${port}`);
});