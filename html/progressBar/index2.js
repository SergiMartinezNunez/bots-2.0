var barProgress;
var phoneNumber;

const NUMBER_STEPS = 55;
/*
function move() {
  if (barProgress == 0) {
    barProgress = 1;
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 1000);


    function frame() {
      if (width >= 100) {
        clearInterval(id);
        barProgress = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
} */

function init() {
  var phone = document.getElementById("phone").value;
  if (phone.length != 9) {
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  } else {
    document.getElementById("myProgress").style.visibility = "visible";
    //document.getElementById("wrapper").style.visibility = "visible";
    document.getElementById("requestTable").style.visibility = "visible";
    document.getElementById("processTable1").style.visibility = "visible";
    document.getElementById("processTable2").style.visibility = "visible";
    document.getElementById("formalizationTable").style.visibility = "visible";
    document.getElementById("buttons").style.visibility = "visible";
    document.getElementById("buttonPhoneNumber").value = "Cambiar número";
    document.getElementById("buttonPhoneNumber").onclick = function () { changeNumber(); };
    phoneNumber = phone;
    // alert(phoneNumber);
    document.getElementById("error").innerHTML = '';
    barProgress = 0;
  }
}

function changeNumber() {
  var phone = document.getElementById("phone").value;
  if (phone.length != 9) {
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  } else {
    phoneNumber = phone;
    alert(phoneNumber);
    document.getElementById("error").innerHTML = '';
  }
}

function calcProgress(step){
  switch(step){
    case 1:
      return 2;//1.81;
    case 2:
      return 13;//12.72;
    case 3:
      return 15;//14.54;
    case 4:
      return 16;//16.36;
    case 5:
      return 18;//18.18;
    case 6:
      return 22;//21.81;
    case 7:
      return 27;//27.27;
    case 8:
      return 38;//38.18;
    case 9:
      return 45;//45.45;
    case 10:
      return 53;//52.72;
    case 11:
      return 58;//58.18;
    case 12:
      return 67;//67.27;
  }

}

function move(step) {
  // if (barProgress == 0) {
  // barProgress = 1;
  var elem = document.getElementById("myBar");
  var width = barProgress;
  var id; 
  var progress = calcProgress(step);
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
  // req.send(JSON.stringify({"estado": nState}));
  console.log("json -> " + JSON.stringify({ "estado": nState, "phone": phoneNumber }));
  console.log("req.body -> " + req.body);
  console.log("req -> " + req);
}
