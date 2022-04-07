const express = require('express');
const app = express();
const fs = require('fs');

const port = '3000'; // set our port
const csv=require('csvtojson');
const { json } = require('express/lib/response');

const csvFilePath='Taxpayers.csv'



  app.get('/api/v1/taxpayers', (req, res) => {
    //return res.send('Received a GET HTTP method');
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        //console.log(jsonObj);
      return (res.json(jsonObj));
    });
  });
  
  app.get('/api/v1/taxpayers/:id', function(req, res) {

    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      //console.log(jsonObj);

      const results = jsonObj.filter(obj => {
        return obj.TAXPAYER_TIN === req.params.id;
      });

      if(results.length > 0){
        return  res.json(results[0]);

      }
      else{
       // return res.send("No person found with the given person code")
        return res.status(500).send("No taxpayer found with the given TIN");
      }
      
    });

  });

  app.post('/api/v1/taxpayers', (req, res) => {
    return res.json({result:'Received a POST HTTP method'});
  });
  
  app.put('/api/v1/taxpayers/:id', (req, res) => {
    return res.json({result:'Received a PUT HTTP method'});
  });
  
  app.delete('/api/v1/taxpayers/:id', (req, res) => {
    return res.json({result:'Received a DELETE HTTP method'});
  });
  
  app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);