const express = require("express");
const connection = require("../../database");
const router = express.Router();


module.exports={
    create: (data, callBack) => {
        connection.query(
          `insert into registration(firstName, lastName, gender, email, password, number) 
                    values(?,?,?,?,?,?)`,
          [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    searchAllFlights: callBack => {
        connection.query(
            `SELECT * FROM fligths_details` ,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      
      searchByCodeAndFlghttNo: (airlineCode,flightNumber, callBack) => {
          
        connection.query(
          `select * from fligths_details where airlineCode = ? and flightNumber = ?`,
          
          [airlineCode,flightNumber],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getUserByUserEmail: (email, callBack) => {
         
        connection.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            
            return callBack(null, results[0]);
          }
        );
      },
    addFlights: (data, callBack) => {
        var values = [data.airline, data.airlineCode, data.flightNumber, data.origin,
        data.availableSeats, data.destination, data.price,
        data.departure, data.arrival, data.duration, data.operationalDays];

        console.log(values);
        insertQuery = `INSERT INTO fligths_details (` +
            `airline, airlineCode, flightNumber, origin, availableSeats, destination, price,` +
            ` departure, arrival, duration, operationalDays)` +
            ` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(insertQuery, values,
            (error, results) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
            
        );
        
    },
    searchByOptDay: (day, callBack)=>{
       
         connection.query(
            `select * from fligths_details where LOCATE (${day},operationalDays)`,
             [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        )
    }
}
