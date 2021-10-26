// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const request = require('request');

var _id;
var _id_envio;
var _id_recogida;
var _phone;

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  const agent = new WebhookClient({ request:req, response:res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

 
  function Seguimiento(agent) {
    _id = agent.parameters["ID"];
	if(agent.locale === 'es'){
		if(_id>0 && _id<1000){
		  _id_envio = _id;
		  agent.add(`Su pedido `+ _id_envio +` se encuentra en el almacén. Está previsto que llegue en 3 dias.
Si quieres activar las notificaciones para saber como evoluciona el envío escribeme 'Activar notificaciones'. 
¿Puedo ayudarle en algo más?`);
		}
		else if(_id>=1000 && _id<2000){
		   _id_envio = _id;
		  agent.add(`Su pedido `+ _id_envio +` se encuentra en ruta. Está previsto que llegue en 1 dia.
Si quieres activar las notificaciones para saber como evoluciona el envío escribeme 'Activar notificaciones'.
¿Puedo ayudarle en algo más?`);
		}else if(_id>=2000 && _id<3000){
		   _id_envio = _id;
		  agent.add(`Su pedido `+ _id_envio +` no se ha encontrado. Compruebe que el ID sea correcto.
¿Puedo ayudarle en algo más?`);
		}else if(_id>=3000 && _id<4000){
		   _id_envio = _id;
		  agent.add(`Su pedido `+ _id_envio +` se encuentra en la tienda de la avenida del paraíso, 5, Girona.
Si quieres activar las notificaciones para saber como evoluciona el envío escribeme 'Activar notificaciones'. 
¿Puedo ayudarle en algo más?`);
		 }else if(_id>=4000 && _id<5000){
			_id_recogida = _id;
		   agent.add(`El repartidor se encuentra de camino para recoger el pedido `+ _id_recogida +`\n¿Puedo ayudarle en algo más?`);
		}else if(_id>=5000 && _id<6000){
		  _id_recogida = _id;
		  agent.add(`Su recogida `+ _id_recogida + ` no se encuentra. Por favor compruebe que ha introducido bien el número.
¿Puedo ayudarle en algo más?`);
		}else{
		  agent.add(`Su pedido aún no esta registrado en nuestra base de datos, por favor pruébelo más tarde.
¿Puedo ayudarle en algo más?`);
		}
	}else if(agent.locale === 'pt'){
		_id_envio = _id;
    if(_id>0 && _id<1000){
      	_id_envio = _id;
		  agent.add(`Seu pedido `+ _id_envio +` está no armazém. A previsão é de chegada em 3 dias.
Se você deseja ativar as notificações para saber como a remessa evolui, escreva 'Ativar notificações'.'.
Posso te ajudar com mais alguma coisa?`);
		}
		else if(_id>=1000 && _id<2000){
		   _id_envio = _id;
		  agent.add(`Seu pedido `+ _id_envio +` está a caminho. A previsão é de chegada em 1 dias.
Se você deseja ativar as notificações para saber como a remessa evolui, escreva 'Ativar notificações'.'.
Posso te ajudar com mais alguma coisa?`);
		}else if(_id>=2000 && _id<3000){
		   _id_envio = _id;
		  agent.add(`Seu pedido `+ _id_envio +` não foi encontrado. Verifique se o ID está correto.
Posso te ajudar com mais alguma coisa?`);
		}else if(_id>=3000 && _id<4000){
		   _id_envio = _id;
		  agent.add(`Seu pedido `+ _id_envio +` está localizado na loja da Avenida del Paraíso, 5, Girona.
Se você deseja ativar as notificações para saber como a remessa evolui, escreva 'Ativar notificações'. 
Posso te ajudar com mais alguma coisa?`);
		 }else if(_id>=4000 && _id<5000){
			_id_recogida = _id;
		   agent.add(`O entregador está a caminho para pegar o pedido`+ _id_recogida +`\nPosso te ajudar com mais alguma coisa?`);
		}else if(_id>=5000 && _id<6000){
		  _id_recogida = _id;
		  agent.add(`Sua coleção `+ _id_recogida + `não se encontra. Verifique se você digitou o número corretamente.
Posso te ajudar com mais alguma coisa?`);
		}else{
		  agent.add(`Seu pedido aún no esta registrado en nuestra base de datos, por favor pruébelo más tarde.
Posso te ajudar com mais alguma coisa?`);
		}
	}
} 

	function Activar(agent) {
        //console.log(req.body);
        //var phone = req.body.originalDetectIntentRequest.payload.WaId;
        //_phone = '+' + phone;
      if(agent.locale === 'es'){
		agent.add(`Se han activado las notificaciones del pedido ` + _id_envio +`. Cuando haya un cambio en el estado se tu pedido se te notificará.
¿Puedo ayudarle en algo más?`);
      }
      else if(agent.locale === 'pt'){
        agent.add(`As notificações de encomenda ` + _id_envio + `foram activadas. Quando houver uma alteração no estado da sua encomenda, será notificado.
Posso te ajudar com mais alguma coisa?`);
      }
    notificacio(0);
	}


  function Welcome(){
    console.log('welcome');
  }

  function notificacio(i){
    var _estado = 'En almacen';

    function canviVar(){
      if(i==1)
        _estado = 'En reparto';
      else if(i==2)
        _estado = 'Entregado';

      request.post(
        'https://dialogflow-twilio-qld74ert7q-lm.a.run.app/notification',
        {
          json: {
            id: _id_envio,
            estado: _estado
          },
        },
        (error, res, body) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`statusCode: ${res.statusCode}`);
          console.log(body);
        }
      );
      if(i<2)
        notificacio(i+1);
    }
    
    setTimeout(canviVar, 15000);
  }
  
  function location(){
    console.log('location');
    var direccion = 'Carrer+del+Doctor+Carreras,1,08490+Tordera,Barcelona'
    var todasTiendas = 'https://www.google.com/maps/search/MRW+' + direccion;
    request.post(
      'https://dialogflow-twilio-qld74ert7q-lm.a.run.app/location',
      {
        json: {
          phone: _phone,
          location: todasTiendas
        },
      },
      (error, res, body) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(body);
      }
    );
  }


  function LocalizarTienda(){
    var phone = req.body.originalDetectIntentRequest.payload.WaId;
    _phone = '+' + phone;
    agent.add(`Aquí tienes la dirección de la tienda MRW más cercana 🛒\n`);
    location();
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', Welcome);
  intentMap.set('Seguimiento', Seguimiento);
  intentMap.set('Activar', Activar);
  intentMap.set('LocalizarTienda', LocalizarTienda);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});