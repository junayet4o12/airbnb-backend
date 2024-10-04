const express = require('express');
const app = express();
const cors = require('cors');



// Using cors enable CORS with various options.

app.use(cors());



app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));


const publicRoute = require("./src/routes/publicRoutes");
// const privateRoute = require("./src/routes/privateRoute");

app.get("/", (req, res) => {
    res.send("Server is healthy");
})

//  Public routes

app.use("/api/v1",publicRoute);

// Private Routes





module.exports = app;
