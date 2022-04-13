var barProgress;
var phoneNumber;
const NUMBER_STEPS = 55;

function init() {
  var phone = document.getElementById("phone").value;
  if (phone.length != 9) {
    document.getElementById("error").innerHTML = '<p>Introduzca un número de telefono válido<p>';
  } else {
    document.getElementById("segonDiv").style.visibility = "visible";
    document.getElementById("buttonPhoneNumber").value = "Cambiar número";
    document.getElementById("buttonPhoneNumber").onclick = function () { changeNumber(); };
    phoneNumber = phone;
    barProgress = 0;
    document.getElementById("error").innerHTML = '';
    fill2ndDiv();
    document.getElementById("lastSent").innerHTML = '<p>No se ha enviado ningún mensaje aún</p>';
  }
}

function fill2ndDiv(){
  document.getElementById("segonDiv").innerHTML = `<h1 class="progressHeader">Proceso hipotecario al ...</h1>
  <div id="myProgress">
      <div id="myBar"></div>
  </div>
  <div id="lastSent"></div>
  <div id="wrapper">
      <div class="left">
          <h1 id="phase1" class="stepPhase">Solicitud</h1>
          <table id="requestTable" class="default">
              <tr class="selectableRow" onclick="setState(1)">
                  <td id="0">0 - Preaprobación</td>
              </tr>
              <tr>
                  <td id="1">1 - Autorizaciones</td>
              </tr>
              <tr>
                  <td id="2">2 - Datos personales</td>
              </tr>
          </table>
          <h1 id="phase2" class="stepPhase">Proceso hipotecario (I)</h1>
          <table id="processTable1" class="default">
              <tr>
                  <td id="3">3 - Datos económicos</td>
              </tr>
              <tr>
                  <td id="4">4 - Datos Vivienda</td>
              </tr>
              <tr>
                  <td id="5">5 - Pendiente documentación</td>
              </tr>
              <tr class="selectableRow" onclick="setState(2)">
                  <td id="6" >6 - Firma documentación precontractual</td>
              </tr>
              <tr class="selectableRow" onclick="setState(3)">
                  <td id="7">6.1 - Assignación código solicitud</td>
              </tr>
              <tr class="selectableRow" onclick="setState(4)">
                  <td id="8">7 - En Sanción</td>
              </tr>
              <tr class="selectableRow" onclick="setState(5)">
                  <td id="9">8 - NS Pendiente</td>
              </tr>
              <tr>
                  <td id="10">9 - NS Solicitada</td>
              </tr>
              <tr class="selectableRow" onclick="setState(6)">
                  <td id="11">10 - Check list VD</td>
              </tr>
              <tr>
                  <td id="12">11 - Revisión VD</td>
              </tr>
              <tr>
                  <td id="13">12 - NS en revisión por garantías</td>
              </tr>
              <tr class="selectableRow" onclick="setState(7)">
                  <td id="14">13 - Petición Docu adicional VD</td>
              </tr>
              <tr>
                  <td id="15">14 - Petición Docu adicional Garantías</td>
              </tr>
              <tr>
                  <td id="16">15 - Petición Docu adicional Garantías-VD</td>
              </tr>
              <tr>
                  <td id="17">16 - Revisión analista de riesgos</td>
              </tr>
              <tr>
                  <td id="18">17 - Consulta duda riesgos</td>
              </tr>
              <tr>
                  <td id="19">138 - Petición docu adicional riesgos</td>
              </tr>
              <tr class="selectableRow" onclick="setState(8)">
                  <td id="20">19 - Tasación pendiente</td>
              </tr>
              <tr>
                  <td id="21">20 - Tasación a validar</td>
              </tr>
              <tr>
                  <td id="22">21 - Tasación subsanada</td>
              </tr>
              <tr>
                  <td id="23">22 - Tasación pendiente de pago</td>
              </tr>
              <tr class="selectableRow" onclick="setState(9)">
                  <td id="24">23 - Tasación pagado</td>
              </tr>
              <tr>
                  <td id="25">24 - Tasación solicitada</td>
              </tr>
              <tr>
                  <td id="26">25 - Pendiente visita tasación</td>
              </tr>
              <tr>
                  <td id="27">26 - Visita agendada</td>
              </tr>
          </table>
      </div>
      <div class="right">
          <h1 id="phase3" class="stepPhase">Proceso hipotecario (II)</h1>
          <table id="processTable2" class="default">
              <tr class="selectableRow" onclick="setState(10)">
                  <td id="28">27 - Visita finalizada</td>
              </tr>
              <tr>
                  <td id="29">28 - Pendiente emisión tasación</td>
              </tr>
              <tr>
                  <td id="30">29 - Tasación revisión garantías</td>
              </tr>
              <tr class="selectableRow" onclick="setState(11)">
                  <td id="31">30 - Petición documentación adicional garantias VT</td>
              </tr>
          </table>
          <h1 class="stepPhase">Formalización</h1>
          <table id="formalizationTable" class="default">
              
              <tr>
                  <td id="32">31 - Plantilla VT</td>
              </tr>
              <tr>
                  <td id="33">32 - Revisión VT</td>
              </tr>
              <tr>
                  <td id="34">33 - Consulta Riesgos desde VT</td>
              </tr>
              <tr>
                  <td id="35">34 - Revisión riesgos -1</td>
              </tr>
              <tr class="selectableRow" onclick="setState(12)">
                  <td id="36">35 - Aprobación final hipoteca</td>
              </tr>
              <tr>
                  <td id="37">36 - Apertura de cuenta</td>
              </tr>
              <tr>
                  <td id="38">37 - Apertura de expediente</td>
              </tr>
              <tr>
                  <td id="39">38 - Elegido notario y fecha</td>
              </tr>
              <tr>
                  <td id="40">39 - Genración documentación</td>
              </tr>
              <tr>
                  <td id="41">40 - Documentación firmada</td>
              </tr>
              <tr>
                  <td id="42">41 - Pendiente firma</td>
              </tr>
              <tr>
                  <td id="43">42 - Subida documentación</td>
              </tr>
              <tr>
                  <td id="44">43 - Alta EE en protocolo notarios</td>
              </tr>
              <tr>
                  <td id="45">44 - Entegado a notario</td>
              </tr>
              <tr>
                  <td id="46">45 - Notario asignado</td>
              </tr>
              <tr>
                  <td id="47">46 - Pendiente subsanar errores</td>
              </tr>
              <tr>
                  <td id="48">47 - Errores subsanados</td>
              </tr>
              <tr>
                  <td id="49">48 - Acta emitida notario</td>
              </tr>
              <tr>
                  <td id="50">49 - Envío Doc. Contractual a notaría</td>
              </tr>
              <tr>
                  <td id="51">50 - Envío Doc. Contractual a gestoría</td>
              </tr>
              <tr>
                  <td id="52">51 - Pendiente en firma notaría</td>
              </tr>
              <tr>
                  <td id="53">52 - Pendiente activas expediente</td>
              </tr>
              <tr>
                  <td id="54">53 - Expediente activado</td>
              </tr>
          </table>
      </div>
  </div>`;
}

function changeNumber() {
  document.getElementById("segonDiv").innerHTML = '';
  document.getElementById("segonDiv").style.visibility = 'hidden';
  init();
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
  console.log("phone -> "+phoneNumber);
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

function setState(nState){
  sendState(nState);
  move(nState);
  updateTables(nState);
}

function changeTitles(step){
  if(step==0){
    document.getElementById("phase1").style.color = "black";
    document.getElementById("phase2").style.color = "black";
    document.getElementById("phase3").style.color = "black";
  }else if(step==1){
    document.getElementById("phase1").style.color = "green";
    document.getElementById("phase2").style.color = "black";
    document.getElementById("phase3").style.color = "black";
  }else if(step==2){
    document.getElementById("phase1").style.color = "green";
    document.getElementById("phase2").style.color = "green";
    document.getElementById("phase3").style.color = "green";
  }
}

function updateTables(nState){
  var maxTd;
  if(nState==1){
    changeTitles(0);
    maxTd = 0;
  }else if(nState==12){
    maxTd = 36;
    changeTitles(2);
  }else{
    changeTitles(1);
  }

  if(nState==2){
    maxTd = 6;
  }else if(nState==3){
    maxTd = 7;
  }else if(nState==4){
    maxTd = 8;
  }else if(nState==5){
    maxTd = 9;
  }else if(nState==6){
    maxTd = 11;
  }else if(nState==7){
    maxTd = 14;
  }else if(nState==8){
    maxTd = 20;
  }else if(nState==9){
    maxTd = 24;
  }else if(nState==10){
    maxTd = 28;
  }else if(nState==11){
    maxTd = 31;
  }

  for(var i=0; i<=36; i++){
    document.getElementById(i).removeAttribute("class");
  }
  for(var i=0; i<=maxTd; i++){
    document.getElementById(i).setAttribute("class","completed");
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
  req.open('POST', 'https://dialogflow-twilio-plghzkocha-lm.a.run.app/state', true);
  req.setRequestHeader('Access-Control-Allow-Origin', '*');
  req.setRequestHeader('Content-Type', 'application/json');
  var json = JSON.stringify({"estado": nState, "phone": phoneNumber});
  req.send(json);
  console.log("json -> " + JSON.stringify({"estado": nState, "phone": phoneNumber}));
  console.log(req.body);
  console.log("req -> " + req);
}


