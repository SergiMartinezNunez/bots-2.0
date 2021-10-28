function hideUnhide(nameDiv) {
    var x = document.getElementById(nameDiv);
    if (x.style.visibility == "hidden") {
        x.innerHTML="Enviado";
        x.style.visibility = "visible";
    } else {
        x.innerHTML=null;
        x.style.visibility = "hidden";
    }
  }

function botonEstadoInicioTramite(){
    hideUnhide("div1");
    sendState(1);
}

function botonEstadoPrecontractual(){
    hideUnhide("div2");
    sendState(2);
}

function botonEstadoPrecontractualFirmado(){
    hideUnhide("div3");
    sendState(3);
}

function botonEstadoNSPendiente(){
    hideUnhide("div4");
    sendState(4);
}

function botonEstadoNSSolicitada(){
    hideUnhide("div5");
    sendState(5);
}

function botonEstadoComprobarListaVD(){
    hideUnhide("div6");
    sendState(6);
}

function botonEstadoDocumentacionVSAdiciconal(){
    hideUnhide("div7");
    sendState(7);
}

function botonEstadoTasacionPendiente(){
    hideUnhide("div8");
    sendState(8);
}

function botonEstadoTasacionPagada(){
    hideUnhide("div9");
    sendState(9);
}

function botonEstadoVisitaFinalizada(){
    hideUnhide("div10");
    sendState(10);
}

function botonEstadoDocAdicionalGarantiasVT(){
    hideUnhide("div11");
    sendState(11);
}

function botonEstadoAprobaciónFinal(){
    hideUnhide("div12");
    sendState(12);
}

function sendState(nState){
    request.post(
        'https://dialogflow-twilio-oflt44nnna-lm.a.run.app/state',
        {
          json: {
            estado: nState
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
}