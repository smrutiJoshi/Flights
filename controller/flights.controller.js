require("dotenv").config();
const { searchAllFlights,
        searchByCodeAndFlghttNo,
        getUserByUserEmail,create,
        addFlights,searchByOptDay } = require("../service/flights/flights.service");


const { sign } = require("jsonwebtoken");

module.exports={
    createUser: (req, res) => {
        const body = req.body;
        //console.log(req.body);
       
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
      },
      addFlights:(req,res)=>{
        const body = req.body;
        addFlights(body,(err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror"
                });
              }
              return res.status(200).json({
                success: 1,
                data: results
              });
        })

      },
    searchAllFlights: (req, res) => {
        searchAllFlights((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      },
      
      searchByCodeAndFlghttNo:(req, res) =>{
          const airlineCode = req.body.airlineCode;
          const flightNumber = req.body.flightNumber;
           
          searchByCodeAndFlghttNo(airlineCode,flightNumber, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            if (!results) {
              return res.json({
                success: 0,
                message: "Record not Found"
              });
            }
           
           // results.password = undefined;
            return res.json({
              success: 1,
              data: results
              
            });
          });

      },
      login: (req, res) => {
        const body = req.body;
        //console.log(req.body.email);
        //console.log(req.body.password);
        
            getUserByUserEmail(body.email, (err, results) => {
                if (err) {
                  console.log(err);
                }
                
                if (!results) {
                  return res.json({
                    success: 0,
                    data: "Invalid email or password"
                  });
                }
                
                const result = (body.password == results.password? true:false);
                 if (result) {
                  results.password = undefined;
                   const jsontoken = sign({ result: results },process.env.SECRET_KEY, {
                    expiresIn: "1h"
                  });
                  return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                  });
                } else {
                  return res.json({
                    success: 0,
                    data: "Invalid email or password"
                  });
                }
              });
       
        
        
      },
      searchByOptDays:(req,res) =>{
          const day = req.body.operationalDays;
        searchByOptDay(day,(err, results) => {
            if (err) {
              console.log(err);
            }
            
            if (!results) {
              return res.json({
                success: 0,
                data: "Invalid operational days"
              });
            }
            return res.json({
                success: 1,
                data: results
                
            });
        });
      }
  
}
 