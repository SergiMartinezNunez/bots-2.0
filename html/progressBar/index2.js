var barProgress = 0;
var phoneNumber;
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

function init(){
  var phone = document.getElementById("phone").value;
  if(phone.length!=9){
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  }else{
    document.getElementById("myProgress").style.visibility = "visible";
    document.getElementById("wrapper").style.visibility = "visible";
    document.getElementById("buttons").style.visibility = "visible";
    document.getElementById("buttonPhoneNumber").value = "Cambiar número";
    document.getElementById("buttonPhoneNumber").onclick = function () {  changeNumber(); };
    phoneNumber = phone;
    alert(phoneNumber);
    document.getElementById("error").innerHTML = '';
  }
}

function changeNumber(){
  var phone = document.getElementById("phone").value;
  if(phone.length!=9){
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  }else{
    phoneNumber = phone;
    alert(phoneNumber);
    document.getElementById("error").innerHTML = '';
  }
}


function move(maxim) {
  // if (barProgress == 0) {
  // barProgress = 1;
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
  var json = JSON.stringify({"estado": nState, "phone": phoneNumber});
  req.send(json);
  // req.send(JSON.stringify({"estado": nState}));
  console.log("json -> " + JSON.stringify({"estado": nState, "phone": phoneNumber}));
  console.log("req.body -> " + req.body);
  console.log("req -> " + req);
}



