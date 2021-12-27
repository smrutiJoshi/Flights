const express = require('express');
const router = express.Router();
//const routes = require('../../service/flights/flights.service');

const routes = require('../../controller/flights.controller');
const { checkToken } = require("../../auth/token_validation");

// Create Login and Users
router.post("/createUser", routes.createUser);
router.post('/addFlights',routes.addFlights);

//Login
router.post("/login",routes.login);

//Search All Flights
router.post('/searchAllFlights',checkToken,routes.searchAllFlights);

// Search Flight by airLineCode and flightNumber
router.post('/searchByCodeAndFlghttNo',checkToken,routes.searchByCodeAndFlghttNo);

// Search Flight by operational days.
router.post('/searchByOptDays',checkToken,routes.searchByOptDays);


module.exports = router;