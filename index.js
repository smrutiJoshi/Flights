require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.APP_PORT || 3000 ; 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Get all apis present in router api folder.
app.use('/',require('./routes/flights/flights.router'));

app.listen(PORT, () =>  console.log(`Server started on port http://localhost:${PORT}`))