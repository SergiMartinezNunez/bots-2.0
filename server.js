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
 const dialogflow = require('@google-cloud/dialogflow');
 require('dotenv').config();
 const dialogflowSessionClient = require('../botlib/dialogflow_session_client.js');
 var franc = require('franc');
 var lang;
 var phone;
 const bodyParser = require('body-parser');
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));


 const CREDENTIALS=JSON.parse(process.env.CREDENTIALS);

 const projectId = 'mrw-jill';
 const phoneNumber = "+12512208903";
 const accountSid = 'AC53d09581e78267e60f03aec4afecf29f';
 const authToken = 'dec6945028be99e7db648644af928ae4';

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS['private_key'],
    client_email: CREDENTIALS['client_email']
  }
}
//const sessionClient = new dialogflowSessionClient(projectId);


 const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

 const detectIntent = async (languageCode, queryText, sessionId)=>{

  let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text:queryText,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log(responses);
  const result = responses[0].queryResult;
  console.log(result);

  return{
    response: result.fulfillmentText
  };
 }

 //detectIntent('pt', 'olá', 'abcd1234');

 
 //For authenticating dialogflow_session_client.js, create a Service Account and
 // download its key file. Set the environmental variable
 // GOOGLE_APPLICATION_CREDENTIALS to the key file's location.
 //See https://dialogflow.com/docs/reference/v2-auth-setup and
 // https://cloud.google.com/dialogflow/docs/setup for details.
 

 
 const client = require('twilio')(accountSid, authToken);
 const MessagingResponse = require('twilio').twiml.MessagingResponse;
 //const sessionClient = new dialogflowSessionClient(projectId);
 
 const listener = app.listen(process.env.PORT, function() {
   console.log('Your Twilio integration server is listening on port '
       + listener.address().port);
 });
 
 app.post('/', async function(req, res) {
  // console.log('hola');
  // console.log(req);
  const body = req.body;
  const text = body.Body;
  phone = body.From;
  console.log(body);
  console.log(text);
  console.log(phone);
  // let id = body.From;  //UnhandledPromiseRejectionWarning: TypeError: Cannot create property 'otherArgs' on string 'whatsapp:+34640268942'
  // console.log('body:'+body);
  // console.log('text:'+text);
  // console.log(id);
  // let languageCode = req.body.languageCode;
  // //console.log(req.body);
  // console.log(languageCode);
  // let queryText = req.body.text;
  // let sessionId = req.body.sessionId;

  //let responseData = await detectIntent(languageCode, queryText, sessionId);

  // res.send(responseData.response);
  if (isNaN(text)){
    var language = (franc.all(text, {only: ['por', 'spa']}));
    console.log(language);
    lang=language[0][0];
    console.log(lang);
  }
  var l;
  if(lang=='por') l = 'pt';
  else l = 'es'; 
  console.log(lang);
  let responseData = await detectIntent(l, text, 'abcd1234');
  var message = responseData.response;
  console.log('holaaaaaaa: ' + message); 
  console.log('response: ' + responseData.response);   
  sendMessage(phone,message);
  //res.send(MessagingResponse);
  res.send(responseData.response);
 });


 app.post('/notification', async function(req, res) {
  const body = req.body;
  const id = body.id;
  const estado = body.estado;
  //let phone = body.phone;
  console.log(req.body);
  console.log(id);
  console.log('estado: ' + estado);
  res.sendStatus(200);
  
  sendNotification(phone,body,id,estado);
});

app.post('/location', async function(req, res){
  const body = req.body;
  let phone = body.phone;
  const _location = body.location;  
  res.sendStatus(200);
  console.log(_location);

  sendLocation(phone,_location);
});

function sendMessage(_phone,_message){
  console.log('sendLocation');
  console.log(_phone);
  console.log(_message);
  client.messages
  .create({from: 'whatsapp:+14155238886', body: (_message), to: _phone})
  .then(message => console.log(message.sid));
}

function sendNotification(_phone, _body,_id, estado){
  console.log(_id);
  if(lang=='pt'){
    client.messages
    .create({from: 'whatsapp:+14155238886', body: ('A encomenda com id ' + _id + ' está em estado: ' + estado), to: (_phone)})
    .then(message => console.log(message.sid));
  }
  else {
    client.messages
    .create({from: 'whatsapp:+14155238886', body: ('El pedido con id ' + _id + ' esta en estado: ' + estado), to: (_phone)})
    .then(message => console.log(message.sid));
  }
}
 
 process.on('SIGTERM', () => {
   listener.close(() => {
     console.log('Closing http server.');
     process.exit(0);
   });
 });
 