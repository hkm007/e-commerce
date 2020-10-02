require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("mongodb connected...");
});

mongoose.connection.on('error', (err) => {
    console.log("Error in connecting to database", err);
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => console.log(`server running on port ${PORT}`));