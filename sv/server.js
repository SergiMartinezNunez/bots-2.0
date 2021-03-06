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
  const cors=require("cors");
  const corsOptions ={
     origin:'*', 
     credentials:true,            //access-control-allow-credentials:true
     optionSuccessStatus:200,
  } 
  app.use(cors(corsOptions)) // Use this after the variable declaration

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
 const authToken = '8e6dae98631fa6acbac53779094e795a';
 var phone;

 const client = require('twilio')(accountSid, authToken);
 const MessagingResponse = require('twilio').twiml.MessagingResponse;
 const sessionClient = new dialogflowSessionClient(projectId);
 
 const listener = app.listen(process.env.PORT, function() {
   console.log('Your Twilio integration server is listening on port '
       + listener.address().port);
 });
 
 app.post('/', async function(req, res) {
   console.log("req '/' ->" + req);
   console.log("req.body '/' ->" + req.body);
   const body = req.body;
   const text = body.Body;
   const id = body.From;
   phone = body.From;
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

app.post('/state', async function(req, res) {
    console.log("He rebut una peticio");
    //console.log("Req -> " + req);
    const body = req.body;  // const body = JSON.parse(req.body);
    const state = body.estado;
    phone = 'whatsapp:+34'+body.phone;
    // console.log("json -> " + json);
    // console.log("phone -> " + phone);
    // console.log("body.phone -> " + body.phone);
    // FI NOU
     var text;
    if(state=="1"){
      text = "Enhorabuena! Tu solicitud de hipoteca ha sido preaprobada.  Continuamos con los pr??ximos pasos para que pronto puedas tener en tus manos la llave de tu casa.";
    }else if(state=="2"){
      text = "Te hemos enviado la  Ficha de Informaci??n Precontractual (FIPRE). Se trata de un documento meramente informativo (no vinculante),  que contiene informaci??n general del pr??stamo hipotecario. Recuerda que la clave para poder descargar dicho documento, es tu n??mero de tel??fono m??vil, seguido de la letra de tu DNI may??scula.";
    }else if(state=="3"){
      text = "Tu solicitud de hipoteca tiene el c??digo XXXXX(n?? caso), la solicitud ir?? pasando por diferentes estados.  Si en alg??n momento quieres realizar una consulta de estado solo tienes que escribirnos.";
    }else if(state=="4"){
      text = "??Listo! Ya puedes seguir completando los pasos de tu solicitud de hipoteca. Puedes volver a acceder al portal pulsando en el siguiente enlace https://hipoteca.evobanco.com/portal-hipotecas";
    }else if(state=="5"){
      text = "Para continuar analizando tu hipoteca, necesitamos que solicites o adjuntes la nota simple (con una antiguedad m??xima de tres meses).";
    }else if(state=="6"){
      text = "Estamos revisando la informaci??n que nos has facilitado. Te avisaremos en cuanto puedas continuar con el proceso de contrataci??n.";
    }else if(state=="7"){
      text = "Para continuar analizando tu hipoteca, es necesario que incluyas en el apartado ???Documentaci??n adicional??? los siguientes documentos: N??mina de noviembre y contrato de arras o compraventa";
    }else if(state=="8"){
      text = "??Bien! Ya tenemos tu nota simple y toda la documentaci??n. Ya puedes solicitar la tasaci??n a trav??s del portal. Si ya dispones de ella, adj??ntala en el apartado ???Tasaci??n??? (v??lida siempre que no tenga una antig??edad superior a 6 meses). Accede al portal para realizar esta  gesti??n a trav??s del siguiente  https://hipoteca.evobanco.com/portal-hipotecas ";
    }else if(state=="9"){
      text = "Te informamos que el pago de la tasaci??n se ha efectuado con ??xito";
    }else if(state=="10"){
      text = "??Bien! Ya hemos concertado una cita para hacer la visita y realizar la tasaci??n. Te avisaremos cuando est?? realizada para avanzar al siguiente paso.";
    }else if(state=="11"){
      text = "Ya disponemos de tu tasaci??n. Te avisaremos cuando haya sido revisada.";
    }else if(state=="12"){
      text = "??Enhorabuena, tu operaci??n ha sido validada! Para que tu gestor contacte contigo, accede a la secci??n ???Firma??? a trav??s de este link https://hipoteca.evobanco.com/portal-hipotecas";
    }
   console.log("Abans d'enviar la resposta");
   console.log("state -> " + state);
   console.log("text -> " + text);
   console.log("phone -> " + phone);
   client.messages
    .create({from: 'whatsapp:+14155238886', body: (text), to: phone})
    .then(message => console.log(message.sid));
});
