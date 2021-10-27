/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 const express = require('express');
 const request = require('request');
 const app = express();
 const dialogflowSessionClient = require('../botlib/dialogflow_session_client.js');
 const bodyParser = require('body-parser');



 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.set('port', process.env.PORT || 3000);
 
 //For authenticating dialogflow_session_client.js, create a Service Account and
 // download its key file. Set the environmental variable
 // GOOGLE_APPLICATION_CREDENTIALS to the key file's location.
 //See https://dialogflow.com/docs/reference/v2-auth-setup and
 // https://cloud.google.com/dialogflow/docs/setup for details.
 
 const projectId = 'mrw-wywq';
 const phoneNumber = "+19852395883";
 const accountSid = 'AC2c6b3c391ccf76477ea445e256db5ddb';
 const authToken = '4d3a07bf9b45e8e3bcc1a7824a60eb78';
 
 const client = require('twilio')(accountSid, authToken);
 const MessagingResponse = require('twilio').twiml.MessagingResponse;
 const sessionClient = new dialogflowSessionClient(projectId);
 
 const listener = app.listen(process.env.PORT, function() {
   console.log('Your Twilio integration server is listening on port '
       + listener.address().port);
 });
 
 app.post('/', async function(req, res) {
   const body = req.body;
   const text = body.Body;
   const id = body.From;
   const dialogflowResponse = (await sessionClient.detectIntent(
       text, id, body)).fulfillmentText;
   const twiml = new  MessagingResponse();
   const message = twiml.message(dialogflowResponse);
   res.send(twiml.toString());
 });
 
 process.on('SIGTERM', () => {
   listener.close(() => {
     console.log('Closing http server.');
     process.exit(0);
   });
 });

//  app.post('/state', async function(req, res) {
//     const body = req.body;
//     const state = body.estado;
//     if(state=="1"){
// 
//     }else if(state=="2"){
// 
//     }else if(state=="3"){
//       
//     }else if(state=="4"){
// 
//     }
//     const dialogflowResponse = (await sessionClient.detectIntent(
//         text, id, body)).fulfillmentText;
//     const twiml = new  MessagingResponse();
//     const message = twiml.message(dialogflowResponse);
//     res.send(twiml.toString());
// });
