const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const calcRouter = require("./routes/calculate.js");
app.use("/calculate", calcRouter);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});