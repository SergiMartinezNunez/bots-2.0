var barProgress;
var phoneNumber;
const NUMBER_STEPS = 55;

function init() {
  var phone = document.getElementById("phone").value;
  if (phone.length != 9) {
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  } else {
    document.getElementById("segonDiv").style.visibility = "visible";
    document.getElementById("requestTable").style.visibility = "visible";
    document.getElementById("processTable1").style.visibility = "visible";
    document.getElementById("processTable2").style.visibility = "visible";
    document.getElementById("formalizationTable").style.visibility = "visible";
    document.getElementById("buttonPhoneNumber").value = "Cambiar número";
    document.getElementById("buttonPhoneNumber").onclick = function () { changeNumber(); };
    phoneNumber = phone;
    barProgress = 0;
    document.getElementById("error").innerHTML = '';
    document.getElementById("lastSent").innerHTML = '<p>No se ha enviado ningún mensaje aún</p>';

  }
}

function changeNumber() {
  var phone = document.getElementById("phone").value;
  if (phone.length != 9) {
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  } else {
    phoneNumber = phone;
    document.getElementById("error").innerHTML = '';
  }
}

function calcProgress(step){
  switch(step){
    case 1:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 0</p>';
      return 2;//1.81;
    case 2:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 6</p>';
      return 13;//12.72;
    case 3:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 6.1</p>';
      return 15;//14.54;
    case 4:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 7</p>';
      return 16;//16.36;
    case 5:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 8</p>';
      return 18;//18.18;
    case 6:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 10</p>';
      return 22;//21.81;
    case 7:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 13</p>';
      return 27;//27.27;
    case 8:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 19</p>';
      return 38;//38.18;
    case 9:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 23</p>';
      return 45;//45.45;
    case 10:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 27</p>';
      return 53;//52.72;
    case 11:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 30</p>';
      return 58;//58.18;
    case 12:
      document.getElementById("lastSent").innerHTML = '<p>Último mensaje enviado: Estado 35</p>';
      return 67;//67.27;
  }
}

function move(step) {
  var elem = document.getElementById("myBar");
  var width = barProgress;
  var id; 
  var progress = calcProgress(step);
  console.log("progress -> "+progress);
  console.log("barProgress -> "+barProgress);
  console.log("step -> "+step);
  console.log("width -> "+width);
  if(barProgress<progress){
    id = setInterval(positiveFrame, 10);
  }else{
    id = setInterval(negativeFrame, 10);
  }

  function positiveFrame() {
    if (width >= progress) {
      clearInterval(id);
      barProgress = progress;
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    }
  }

  function negativeFrame() {
    if (width <= progress) {
      clearInterval(id);
      barProgress = progress;
    } else {
      width--;
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    }
  }
}

function sendState(nState) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if (req.status == 200)
        console.log(req.responseText);
      else
        console.log("Error loading page\n");
    }
  };
  req.open('POST', 'https://dialogflow-twilio-oflt44nnna-lm.a.run.app/state', true);
  req.setRequestHeader('Access-Control-Allow-Origin', '*');
  req.setRequestHeader('Content-Type', 'application/json');
  var json = JSON.stringify({ "estado": nState, "phone": phoneNumber });
  req.send(json);
  console.log("json -> " + JSON.stringify({ "estado": nState, "phone": phoneNumber }));
  console.log("req.body -> " + req.body);
  console.log("req -> " + req);
}
