var text = '<p>Estado enviado</p>';
var hide1=true, hide2=true, hide3=true, hide4=true;

function buttonState1(){
    if(hide1){
        document.getElementById('div1').innerHTML = text;
        hide1=false;
        // FALTA URL SERVIDOR 
        //request.post(
        //    '',
        //    {
        //      json: {
        //        id: _id_envio,
        //        estado: _estado
        //      },
        //    },
        //    (error, res, body) => {
        //      if (error) {
        //        console.error(error);
        //        return;
        //      }
        //      console.log(`statusCode: ${res.statusCode}`);
        //      console.log(body);
        //    }
        //);
    }else{
        document.getElementById('div1').innerHTML = null;
        hide1=true;
    }
}

function buttonState2(){
    if(hide2){
        document.getElementById('div2').innerHTML = text;
        hide2=false;
    }else{
        document.getElementById('div2').innerHTML = null;
        hide2=true;
    }
}

function buttonState3(){
    if(hide3){
        document.getElementById('div3').innerHTML = text;
        hide3=false;
    }else{
        document.getElementById('div3').innerHTML = null;
        hide3=true;
    }
}

function buttonState4(){
    if(hide4){
        document.getElementById('div4').innerHTML = text;
        hide4=false;
    }else{
        document.getElementById('div4').innerHTML = null;
        hide4=true;
    }
}
