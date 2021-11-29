
var userPwd=getCookie("userPwd");
var profileId=getCookie("profileId");

$(function() {
    'use strict'



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
    li.append("Comandos");
    menu.append(li);

    for(let datos of jsonComandos){

        var liComando=$("<li>");
        var a=$("<a>");
        var i=$("<i>");
        var span=$("<span>");
        liComando.addClass("nav-item");
        var comandoSinEspacio= datos.commandName.replace(/\s/g, '');
        liComando.attr("id",comandoSinEspacio);
        a.attr("href","/xaquin/comando/"+datos.commandID);
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



    }


}).fail(function(data){
  showSwal('hotelComandos');
});
//fin petición COMANDOS
});


function cargarDatos(idComando,nombreComando,tipoComando){

    var params = {'apiKey':'02d5214506fa468484e962868800395f','userPwd':'69637182','profileID':'1268900770','commandID':idComando};
//inicio petición COMANDOS
    $.get( "https://pre.s-recsolutions.com/v1/command/command",  params )
        .then(function( jsonComando ) {
          console.log("hola")
          var anteriorComando=$("li[class*='nav-item active']");
          anteriorComando.removeClass();
          anteriorComando.addClass("nav-item");
          var comandoSinEspacio = jsonComando[0].commandName.replace(/\s/g, '');

          var listaComando=$("#"+comandoSinEspacio);
          listaComando.removeClass();
          listaComando.addClass("nav-item active");

            var tabla=$("#dataTableExample");
            tabla.remove();
            eliminarPaginacion();
            var div=$("#tablaComandos");
            var tabla=$("<table>")
            tabla.attr("id","dataTableExample");
            tabla.addClass("table");
            div.append(tabla);
            var titulo=$("#tituloComando");
            titulo.empty();
            titulo.append("Configuración "+(jsonComando[0].commandName).toLowerCase());

            var thead=$("<thead>");
            var trHead=$("<tr>");
            var thEnlace=$("<th>");
            thEnlace.addClass("text-white");
            thEnlace.append("Información");

            var thUsuario=$("<th>");
            thUsuario.addClass("text-white");
            thUsuario.append("Parametro");

           if(tipoComando=="FA"){
            var thEntrada=$("<th>");
            thEntrada.addClass("text-white");
            thEntrada.append("Valor");

            var thSalida=$("<th>");
            thSalida.addClass("text-white");
            thSalida.append("Descripción");
           }



            var thHora=$("<th>");
            thHora.addClass("text-white");
            thHora.append("Descripción");


            trHead.append(thUsuario);
            if(tipoComando=="F"){
              var thSalida=$("<th>");
              thSalida.addClass("text-white");
              thSalida.append("Valor");
              trHead.append(thSalida);
             }

            if(tipoComando=="FA"){
              trHead.append(thEntrada);
              trHead.append(thSalida);
            }

            trHead.append(thHora);

            thead.append(trHead);
            tabla.append(thead);
            var tbody=$("<tbody>");

            //Nombre del Comando
              var tr=$("<tr>");
              var NombreConf=$("<td>");
              NombreConf.append("<h6>Nombre del Comando</h6>");

              var valor=$("<td>");
              valor.append("<input value ="+ jsonComando[0].commandName+">");

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
              valor.append("<textarea rows="+4+" cols="+50+">"+jsonComando[0].commandDescription);

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
              valor.append("<button onclick=showModalPopUp()>configurar");

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
              valor.append("<button onclick=showModalPopUp()>configurar");

              var descripcion=$("<th>");
              descripcion.append("<h6>Flujo que seguirá el comando a la hora de ejecutarse</h6>");

              tr.append(NombreConf);
              tr.append(valor);
              tr.append(descripcion);
              tbody.append(tr);

            //Opciones avanzadas del Comando
              var tr=$("<tr>");
              var NombreConf=$("<td>");
              NombreConf.append("<h6>Opciones avanzadas</h6>");

              var valor=$("<td>");
              valor.append("a");
              valor.append("a1");
              valor.append("a2");
              valor.append("a3");
              var descripcion=$("<th>");
              descripcion.append("<h6>Distintas opciones para personalizar aúm más el configurador</h6>");

              tr.append(NombreConf);
              tr.append(valor);
              tr.append(descripcion);
              tbody.append(tr);
          tabla.append(tbody);
          console.log(tbody)


          paginar();

}).fail(function(data){
  showSwal('hotelUsosComando',nombreComando);


});
//fin petición USOS




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
function showModalPopUp(){
  window.location = "comando"
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

   function send_edit_command(name,commandId,description) {
    var type = '0';
    var data
    commandId == undefined ? data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":commandId,"description":description,"name":name,"profileID":"1268900770","userPwd":"69637182"}
    :  data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":commandId,"name":name,"profileID":"1268900770","userPwd":"69637182"};

    var url = 'https://pre.s-recsolutions.com/v1/new/command';

    send_post(data, url,type).then((j) => {
      console.log(eval(j));
    });
  }

   function send_edit_step(name) {
    var type = '0';
    // var data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":"-755434474","name":name,"description":"","profileID":"1268900770","userPwd":"69637182","type":"0"};
    var data = {"apiKey":"02d5214506fa468484e962868800395f","commandID":"-755434474","name":name,"profileID":"1268900770","userPwd":"69637182"};
    var url = 'https://pre.s-recsolutions.com/v1/new/step';

    send_post(data, url,type).then((j) => {
      console.log(eval(j));
    });
  }



  function send_post(data, url, type) {
    var valor, index;
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': '*',
        'Content-Type': '*'
      },
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




