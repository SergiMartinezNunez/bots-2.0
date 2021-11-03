function hideUnhide(nameDiv, nState) {
    var x = document.getElementById(nameDiv);
    if (x.style.visibility == "hidden") {
        x.innerHTML="Enviado";
        x.style.visibility = "visible";
        sendState(nState);
    } else {
        x.innerHTML=null;
        x.style.visibility = "hidden";
    }
  }

function botonEstadoInicioTramite(){
    hideUnhide("div1", 1);
}

function botonEstadoPrecontractual(){
    hideUnhide("div2", 2);
}

function botonEstadoPrecontractualFirmado(){
    hideUnhide("div3", 3);
}

function botonEstadoNSPendiente(){
    hideUnhide("div4", 4);
}

function botonEstadoNSSolicitada(){
    hideUnhide("div5", 5);
}

function botonEstadoComprobarListaVD(){
    hideUnhide("div6", 6);
}

function botonEstadoDocumentacionVSAdiciconal(){
    hideUnhide("div7", 7);
}

function botonEstadoTasacionPendiente(){
    hideUnhide("div8", 8);
}

function botonEstadoTasacionPagada(){
    hideUnhide("div9", 9);
}

function botonEstadoVisitaFinalizada(){
    hideUnhide("div10", 10);
}

function botonEstadoDocAdicionalGarantiasVT(){
    hideUnhide("div11", 11);
}

function botonEstadoAprobaciónFinal(){
    hideUnhide("div12", 12);
}

function sendState(nState){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
           if(req.status == 200)
              console.log(req.responseText);
           else
              console.log("Error loading page\n");
        }
      };
    req.open('POST', 'https://dialogflow-twilio-oflt44nnna-lm.a.run.app/state', true);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Content-Type', 'application/json');
    var json = JSON.stringify({"estado": nState});
    req.send(json);
    // req.send(JSON.stringify({"estado": nState}));
    console.log("json -> " + JSON.stringify({"estado": nState}));
    console.log("req.body -> " + req.body);
    console.log("req -> " + req);
}