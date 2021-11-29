
var userPwd=getCookie("userPwd");
var profileId=getCookie("profileId");
var nombreComando = "fin"

function cargarComandos(){

    var comandos = {
                    apiKey:"02d5214506fa468484e962868800395f",
                    userPwd:'69637182',
                    profileID:'1268900770'
   };

  //inicio petición COMANDOS
  $.get( "https://pre.s-recsolutions.com/v1/command/command", comandos )
  .done(function( jsonComandos ) {

      var menu=$("#barraNavegacion");
      var li=$("<li>");
      li.addClass("nav-item nav-category text-dark");
      li.append("Comando");
      menu.append(li);

      for(let datos of jsonComandos){

          var liComando=$("<li>");
          var a=$("<a>");
          var i=$("<i>");
          var span=$("<span>");
          liComando.addClass("nav-item");
          var comandoSinEspacio = datos.commandName.replace(/\s/g, '');
          liComando.attr("id",datos.commandID);
          a.attr("href", "/xaquin/comando/"+datos.commandID);
          a.attr("onclick","cargarDatos("+datos.commandID+",'"+datos.commandName+"','"+datos.type+"')");
          a.addClass("nav-link");
          i.addClass("link-icon");
          i.attr("data-feather","box");
          span.addClass("link-title");
          var comandoCapitalizado=(datos.commandName).charAt(0).toUpperCase()+(datos.commandName.slice(1));
          span.append(comandoCapitalizado);

          a.append(i);
          a.append(span);
          liComando.append(a);
          menu.append(liComando);

          var path = window.location.href.split("/");

          if(datos.commandID == path[5]){

            var li=$("<li id=\"Steps\" style=\"margin-left: "+30+"px\">");
            li.addClass("nav-item nav-category text-dark");
            li.append("Pasos de "+ datos.commandName);
            menu.append(li);
            for(let step of datos.steps){
              var liStep=$("#Steps");
              var a=$("<a>");
              var i=$("<i>");
              var span=$("<span>");
              liStep.addClass("nav-item");
              var stepSinEspacio= step.step.stepName.replace(/\s/g, '');
              liStep.attr("id",stepSinEspacio);
              a.attr("href", "/xaquin/comando/"+datos.commandID+"/step/"+step.stepID);
              a.attr("onclick","cargarDatos("+step.stepID+",'"+step.step.stepName+"')");
              a.addClass("nav-link");
              i.addClass("link-icon");
              i.attr("data-feather","box");
              span.addClass("link-title");
              var stepCapitalizado=(step.step.stepName).charAt(0).toUpperCase()+(step.step.stepName.slice(1));
              console.log(stepCapitalizado)
              span.append(stepCapitalizado);

              a.append(i);
              a.append(span);
              liStep.append(a);
              menu.append(liStep);
            }
            var br=$("<br>");
            menu.append(br);
          }
      }
  }).fail(function(data){
    showSwal('hotelComandos');
  });
}
//fin petición COMANDOS



function cargarDatos(idComando){

  var params = {'apiKey':'02d5214506fa468484e962868800395f','userPwd':'69637182','profileID':'1268900770','commandID':idComando};
//inicio petición COMANDOS
  $.get( "https://pre.s-recsolutions.com/v1/command/command",  params )
      .then(function( jsonComando ) {
        console.log(jsonComando)
        var anteriorComando=$("li[class*='nav-item active']");
        anteriorComando.removeClass();
        anteriorComando.addClass("nav-item");
        var comandoSinEspacio = jsonComando[0].commandName.replace(/\s/g, '');

        var listaComando=$("#"+comandoSinEspacio);
        listaComando.removeClass();
        listaComando.addClass("nav-item active");

          var tabla=$("#dataTableExample");
          tabla.remove();
          var div=$("#tablaComandos");
          var tabla=$("<table>")
          tabla.attr("id","dataTableExample");
          tabla.addClass("table");
          div.append(tabla);
          var titulo=$("#tituloComando");
          titulo.empty();
          titulo.append("Configuración del comando '"+(jsonComando[0].commandName).toLowerCase()+"'");

          var thead=$("<thead>");
          var trHead=$("<tr>");

          var thUsuario=$("<th>");
          thUsuario.addClass("text-white");
          thUsuario.append("Parametro");

         if(jsonComando.type=="FA"){
          var thEntrada=$("<th>");
          thEntrada.addClass("text-white");
          thEntrada.append("Valor");

          var thSalida=$("<th>");
          thSalida.addClass("text-white");
          thSalida.append("Valor");
         }

          var thHora=$("<th>");
          thHora.addClass("text-white");
          thHora.append("Valor");


          trHead.append(thUsuario);
          if(jsonComando.type=="F"){
            var thSalida=$("<th>");
            thSalida.addClass("text-white");
            thSalida.append("Valor");
            trHead.append(thSalida);
           }

          if(jsonComando.type=="FA"){
            trHead.append(thEntrada);
            trHead.append(thSalida);
          }

          trHead.append(thHora);
          if(jsonComando.type!="F"&&jsonComando.type!="FA"){

            var thResumen=$("<th>");
            thResumen.addClass("text-white");
            thResumen.append("Descripción");
            trHead.append(thResumen);
          }
          thead.append(trHead);
          tabla.append(thead);
          var tbody=$("<tbody>");

          //Nombre del Comando
            var tr=$("<tr>");
            var NombreConf=$("<td>");
            NombreConf.append("<h6>Nombre del Comando</h6>");


            var valor=$("<td>");
            valor.append("<input style=\"width: 23rem;\" id=\"nombre\" onchange=\"edit_command("+JSON.stringify(jsonComando[0]).replace(/"/g,"'")+")\" value =\""+ jsonComando[0].commandName+"\">");

            var descripcion=$("<th>");
            descripcion.append("<h6>El nombre por el cual este comando será identificado</h6>");

            tr.append(NombreConf);
            tr.append(valor);
            tr.append(descripcion);
            tbody.append(tr);

          //Descripción del Comando
            var tr=$("<tr>");
            var NombreConf=$("<td>");
            NombreConf.append("<h6>Descripción del Comando</h6>");

            var valor=$("<td>");
            valor.append("<textarea id=\"descripcion\" onchange=\"edit_command("+JSON.stringify(jsonComando[0]).replace(/"/g,"'")+")\" rows="+4+" cols="+50+">"+jsonComando[0].commandDescription);

            var descripcion=$("<th>");
            descripcion.append("<h6>En este campo irá información relevante sobre el comando</h6>");

            tr.append(NombreConf);
            tr.append(valor);
            tr.append(descripcion);
            tbody.append(tr);

          //Sinónimos del Comando
            var tr=$("<tr>");
            var NombreConf=$("<td>");
            NombreConf.append("<h6>Sinónimos del comando</h6>");

            var valor=$("<td>");
            valor.append("<button onclick=route('"+window.location.href+"/sinonimos')>configurar");

            var descripcion=$("<th>");
            descripcion.append("<h6>En este campo se configurará las distintas maneras en las que te puedes referir para llamar a este comando</h6>");

            tr.append(NombreConf);
            tr.append(valor);
            tr.append(descripcion);
            tbody.append(tr);

          //Sinónimos del Comando
            var tr=$("<tr>");
            var NombreConf=$("<td>");
            NombreConf.append("<h6>Flujo de trabajo del comando</h6>");

            var valor=$("<td>");
            valor.append("<button onclick=route('"+window.location.href+"/flujo')>configurar");

            var descripcion=$("<th>");
            descripcion.append("<h6>Flujo que seguirá el comando a la hora de ejecutarse</h6>");

            tr.append(NombreConf);
            tr.append(valor);
            tr.append(descripcion);
            tbody.append(tr);

          //Opciones avanzadas del Comando
            var tr=$("<tr id=\"columns_options\">");
            var NombreConf=$("<td>");
            NombreConf.append("<h6>Opciones avanzadas</h6>");

            var valor=$("<td id=\"advance_options\">");
            valor.append("<button onclick=\"add_advanceOptions("
              + JSON.stringify(jsonComando[0]).replace(/"/g,"'")
              +")\">Mostrar opciones avanzadas</button>")

            var descripcion = $("<td id=\"advance_options_description\">");
            descripcion.append("Menu para configurar detalles avanzados del buscador")

            tr.append(NombreConf);
            tr.append(valor);
            tr.append(descripcion);
            tbody.append(tr);
        tabla.append(tbody);
});
}

function paginar() {
    $('#dataTableExample').DataTable({

      "aLengthMenu": [
        [10, 30, 50, -1],
        [10, 30, 50, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      }
    });
    $('#dataTableExample').each(function() {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Search');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
}

function eliminarPaginacion(){
  $('#dataTableExample_wrapper').remove();
}


function abrirEjecucionUso(idUso,idComando){
  localStorage.setItem("usageID", idUso);
  localStorage.setItem("commandID", idComando);

  localStorage.removeItem("commandName");
  // window.open("https://www.s-recsolutions.com/dashboard/amaquia/usos.html","myWindow","width="+screen.availWidth+",height="+screen.availHeight);

}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

async function send_get_command(commandId) {

  var params = {'apiKey':'02d5214506fa468484e962868800395f','userPwd':'69637182','profileID':'1268900770','commandID':commandId};
  var url = 'https://pre.s-recsolutions.com/v1/command/command';

  let j = await send_get(params, url);
  let listOfCommands = eval(j)
  return listOfCommands;

}



async function send_get_command_with_several_steps() {

  var params = {'apiKey':'969067660cd34dcba78ed0b2840e3d2d','userPwd':'69637182','profileID':'1268900770','commandID':"493868100"};
  var url = 'https://pre.s-recsolutions.com/v1/command/command';

  let j = await send_get(params, url);
  let listOfCommands = eval(j)
  return listOfCommands;

}

async function send_get_step(commandId,stepId) {

  var params = {'apiKey':'02d5214506fa468484e962868800395f','userPwd':'69637182','profileID':'1268900770','commandID':commandId,'stepID':stepId};
  var url = 'https://pre.s-recsolutions.com/v1/command/command';

  let j = await send_get(params, url);
  let listOfCommands = eval(j)
  return listOfCommands;

}

function send_edit_command(command) {
var type = '0';
var data
data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":command.commandID+"",
"description":command.commandDescription,"name":command.commandName,"iterationSave": command.iterationSave,
"stopwords": command.stopwords, "similarName": command.similarName,"question":  command.question,
"profileID":"1268900770","userPwd":"69637182"}

var url = 'https://pre.s-recsolutions.com/v1/command/new/command';

send_post(data, url,type).then((j) => {
  return eval(j)
}).catch((err => {
  // do some stuff with the error passed in from reject
  const error = err;
  // expected response
  // error, response failed from fetch
}));
}

async function send_create_step(commandID,step) {
  var type = '0';
  var data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":commandID,"name":step.stepName,"profileID":"1268900770","userPwd":"69637182","type":"0"};
  var url = 'https://pre.s-recsolutions.com/v1/command/new/step';

  return send_post(data, url,type).then((j) => {
    return j
  }).catch((err => {
    // do some stuff with the error passed in from reject
    const error = err;
    console.log(err)
    // expected response
    // error, response failed from fetch
  }));
}

function send_edit_step(commandID,step) {
  var type = '0';
  var data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":commandID,"name":step.stepName,"stepID":step.stepID ,"profileID":"1268900770","userPwd":"69637182"};
  var url = 'https://pre.s-recsolutions.com/v1/command/new/step';

  send_post(data, url,type).then((j) => {
    console.log(j)
  }).catch((err => {
    // do some stuff with the error passed in from reject
    const error = err;
    // expected response
    // error, response failed from fetch
  }));
}

function send_post(data, url, type) {
  var valor, index;
  return fetch(url, {
    method: 'POST',
    mode: 'cors',

    body: JSON.stringify(data)
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    if (!localStorage.getItem('userPwd') && !localStorage.getItem('profileID')) {
      index = text.indexOf('\n');
      valor = text.substring(0, index);
      localStorage.setItem('userPwd', valor);
      valor = text.substring(index + 1);
      localStorage.setItem('profileID', valor);
    }
    if(type == 'event') {
      text = valor;
      index = text.indexOf('\n');
      valor = text.substring(0, index);
      valor = text.substring(index + 1);
      localStorage.setItem('idEvent', valor);
    }
    return text;
  });
}

function send_get(params, url) {
  var queryString = Object.keys(params).map(function(key) {
    return key + '=' + params[key]
  }).join('&');

  var completeUrl = url +"?"+ queryString;
  return fetch(completeUrl, {
    method: 'GET',
    mode: 'cors',
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    return text;
  });
}

async function edit_command(command){
  command.commandName      = $("#nombre").val()
  command.commandDescription = $("#descripcion").val().replace("\n", '')
  command.similarName = $("#SimilarName").prop('checked')+"";
  command.question    = $("#Question").prop('checked')+"";
  command.stopwords   = $("#stopWords").prop('checked')+"";
  command.iteration   = $("#iteration").prop('checked')+"";
  let newCommand  = send_edit_command(command)
  add_advanceOptions(command.commandID);
}

function route(url){
  window.location.replace(url)
}

async function delete_advanceOptions(commandID){
  let command = await send_get_command(commandID)
  $('#advance_options').remove();
  $('#advance_options_description').remove();
  var tr= $('#columns_options');
  var valor=$("<td id=\"advance_options\">");
  valor.append("<button onclick=\"add_advanceOptions("
  + JSON.stringify(command[0]).replace(/"/g,"'")
  +")\">Mostrar opciones avanzadas</button>")
  var descripcion = $("<td id=\"advance_options_description\">");
  descripcion.append("Menu para configurar detalles avanzados del buscador")

  tr.append(valor);
  tr.append(descripcion);
}

function searchStep(steps,stepID){
  for(let i = 0; i < steps.length;i++){
    if(steps[i].stepID == stepID) return i
  }
  return -1
}

async function add_advanceOptions(command){
  var comando = JSON.stringify(command).replace(/"/g,"'")
  deleteCommand= comando;
  let similarName_checkbox  = command.similarName.toLowerCase() == "true";
  let question_checkbox     = command.question.toLowerCase() == "true";
  let stopwords_checkbox    = command.stopwords.toLowerCase() == "true";
  let iteration_checkbox    = command.iterationSave.toLowerCase() == "true";

  $('#advance_options').remove();
  $('#advance_options_description').remove();
  var tr= $('#columns_options');

  var valor=$("<td id=\"advance_options\">");
  valor.append("Nombres similares <input onchange=\"edit_command("+comando+")\" id=\"SimilarName\" type=\"checkbox\">");

  valor.append("<td>");
  valor.append("Tipo pregunta <input onchange=\"edit_command("+comando+")\" onclick=s id=\"Question\" type=\"checkbox\">");

  valor.append("<td>");
  valor.append("Solo palabras clave <input onchange=\"edit_command("+comando+")\" <input id=\"stopWords\" type=\"checkbox\" >");

  valor.append("<td>");
  valor.append("Procesado ágil <input onchange=\"edit_command("+comando+")\" id=\"iteration\" type=\"checkbox\">");

  valor.append("<td>");
  valor.append("<button onclick=\"delete_advanceOptions("+ command.commandID+")\">Mostrar opciones avanzadas</button>")

  var descripcion=$("<td id=\"advance_options_description\">");
  descripcion.append("Permite un cierto margen de error a la hora de entender el nombre del paso");
  descripcion.append("<td>");
  descripcion.append("Indica si el comando es del tipo pregunta respuesta");
  descripcion.append("<td>");
  descripcion.append("Elimina palabras que no aportan información relevante como preposiciones");
  descripcion.append("<td>");
  descripcion.append("En cada iteración del usuario se va a procesar cada step uno a uno");
  descripcion.append("<td>");


  tr.append(valor);
  tr.append(descripcion);

  $("#SimilarName").prop("checked",similarName_checkbox);
  $("#Question").prop("checked",question_checkbox);
  $("#stopWords").prop("checked",stopwords_checkbox);
  $("#iteration").prop("checked",iteration_checkbox);
}

