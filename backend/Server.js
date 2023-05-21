const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/TodoRoute");

const app = express();
const PORT = process.env.PORT | 5000;

const corsOptions = {
    origin: "https://todolist1-8k7m.onrender.com", // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));



mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));


// Routes
app.use(routes);

app.listen(PORT, () => console.log("Server running on port " + PORT));