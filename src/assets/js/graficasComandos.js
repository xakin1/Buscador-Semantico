
var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
var week = new Date(date.getFullYear(), date.getMonth(), date.getDate()-6);
var comandosFechas=localStorage.getItem("comandosFechas");
var comandosHoras=localStorage.getItem("comandosHoras");
var comandosUsuarios=localStorage.getItem("comandosUsuarios");
var comandosProblemas=localStorage.getItem("comandosProblemas");

var userPwd=getCookie("userPwd");
var profileId=getCookie("profileId");
var colorPrimario=localStorage.getItem("colorPrimario");

if(colorPrimario==null){
  localStorage.setItem("colorPrimario","#0f1d5a");
  colorPrimario="#0f1d5a";
}

var listaGraficas=[{

  grafica:"comandosFechas",
  orden:comandosFechas
},
{

  grafica:"comandosHoras",
  orden:comandosHoras
},
{

  grafica:"comandosUsuarios",
  orden:comandosUsuarios
},
{

  grafica:"comandosProblemas",
  orden:comandosProblemas
}
];


listaGraficas.sort((a, b) => (a.orden > b.orden) ? -1 : 1)

var analiticasDisponibles=[
  {
    id:1,
    titulo:"Uso de comandos por fechas",
    nombre:"comandosFechas"
  },
  {
    id:2,
    titulo:"Uso de comandos por horas",
    nombre:"comandosHoras"
  },
  {
    id:3,
    titulo:"Uso de comandos por usuarios",
    nombre:"comandosUsuarios"
  },
  {
    id:4,
    titulo:"Uso de comandos con problemas",
    nombre:"comandosProblemas"
  }

]






$(function() {
    'use strict';


if(userPwd!=null&&profileId!=null){
  cargarSeleccionGraficas();
  cargarOnChangeAnaliticas();
  cargarGraficas();
  $('#dashboardDate').change(function(){
    cargarGraficaUsuarios();
    var fecha1=$('#dashboardDate').datepicker('getDate');
    $("#dashboardDate2").datepicker("destroy");
    $('#dashboardDate2').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      endDate: "today",
      startDate: fecha1
    });
  });
  $('#dashboardDate2').change(function(){
    cargarGraficaUsuarios();
    var fecha1=$('#dashboardDate2').datepicker('getDate');
    $("#dashboardDate").datepicker("destroy");
    $('#dashboardDate').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      endDate: fecha1
    });
  });
  $('#dashboardDate3').change(function(){
    cargarGraficaUsuarios2();
    var fecha1=$('#dashboardDate3').datepicker('getDate');
    $("#dashboardDate4").datepicker("destroy");
    $('#dashboardDate4').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      startDate: fecha1
    });
  });

  $('#dashboardDate4').change(function(){
    cargarGraficaUsuarios2();
    var fecha1=$('#dashboardDate4').datepicker('getDate');
    $("#dashboardDate3").datepicker("destroy");
    $('#dashboardDate3').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      endDate: fecha1
    });
  });

  $('#dashboardDate7').change(function(){

    cargarGraficaHorasUsos();

    var fecha1=$('#dashboardDate7').datepicker('getDate');

    $("#dashboardDate8").datepicker("destroy");

    $('#dashboardDate8').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      startDate: fecha1

    });

  });

  $('#dashboardDate8').change(function(){

    cargarGraficaHorasUsos();

    var fecha1=$('#dashboardDate8').datepicker('getDate');

    $("#dashboardDate7").datepicker("destroy");

    $('#dashboardDate7').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      endDate: fecha1

    });
  });



  $('#dashboardDate11').change(function(){

    cargarGraficaProblemas();

    var fecha1=$('#dashboardDate11').datepicker('getDate');

    $("#dashboardDate12").datepicker("destroy");

    $('#dashboardDate12').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      startDate: fecha1

    });

  });


  $('#dashboardDate12').change(function(){

    cargarGraficaProblemas();

    var fecha1=$('#dashboardDate12').datepicker('getDate');

    $("#dashboardDate11").datepicker("destroy");

    $('#dashboardDate11').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true,
      endDate: fecha1

    });
  });



  $( "#selectUsuarios" ).change(function() {

    cargarGraficaUsuarios();
  });


  $( "#selectComandos" ).change(function() {
    cargarGraficaUsuarios();
  });

  $( "#selectComandos4" ).change(function() {
    cargarGraficaHorasUsos();
  });

  $( "#selectUsuarios4" ).change(function() {

   cargarGraficaHorasUsos();
  });

  $('.dropdown-menu').click(function(e) {
    e.stopPropagation();
});
}

});






function cargarSelectUsuarios(){

    var datos = {
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:"69637182",
                profileID:"1268900770"
   };
   var usuarios=[];

    $.get( "https://pre.s-recsolutions.com/v1/command/use", datos )
    .done(function( jsonComando ) {


        for(let uso of jsonComando){
            if(jQuery.inArray(uso.userName, usuarios) == -1 && uso.userName!=""){
                usuarios.push(uso.userName);
            }
        }
        var listaUsuarios=$("#selectUsuarios4");
        for(let usuario of usuarios){

            listaUsuarios.append("<option>"+usuario+"</option>")
        }
    });



}


function cargarSelectUsuarios4(){

  var datos = {
              apiKey:"02d5214506fa468484e962868800395f",
              userPwd:"69637182",
              profileID:"1268900770"
 };
 var usuarios=[];

  $.get( "https://pre.s-recsolutions.com/v1/command/use", datos )
  .done(function( jsonComando ) {


      for(let uso of jsonComando){
          if(jQuery.inArray(uso.userName, usuarios) == -1 && uso.userName!=""){
              usuarios.push(uso.userName);
          }
      }
      var listaUsuarios=$("#selectUsuarios");
      for(let usuario of usuarios){

          listaUsuarios.append("<option>"+usuario+"</option>")
      }
  });



}





function cargarSelectUsuarios3(){

  var datos = {
              apiKey:"02d5214506fa468484e962868800395f",
              userPwd:"69637182",
              profileID:"1268900770"
 };
 var usuarios=[];

  $.get( "https://pre.s-recsolutions.com/v1/command/use", datos )
  .done(function( jsonComando ) {


      for(let uso of jsonComando){
          if(jQuery.inArray(uso.userName, usuarios) == -1 && uso.userName!=""){
              usuarios.push(uso.userName);
          }
      }
      var listaUsuarios=$("#selectUsuarios3");
      for(let usuario of usuarios){

          listaUsuarios.append("<option>"+usuario+"</option>")
      }
  });



}

function cargarSelectComandos(){

  var datos = { method: 'GET',
              apiKey:"02d5214506fa468484e962868800395f",
              userPwd:userPwd,
              profileID:profileId
 };
 var comandos=[];

  $.get( "https://api.s-recsolutions.com/v1/command/command", datos )
  .done(function( jsonComando ) {


      for(let uso of jsonComando){
          if(jQuery.inArray(uso.commandName, comandos) == -1 && uso.commandName!=""){
              comandos.push(uso.commandName);
          }
      }
      var listaComandos=$("#selectComandos");
      for(let comando of comandos){

          listaComandos.append("<option>"+comando+"</option>")
      }
  });



}

function cargarSelectComandos4(){

  var datos = { method: 'GET',
              apiKey:"02d5214506fa468484e962868800395f",
              userPwd:userPwd,
              profileID:profileId
 };
 var comandos=[];

  $.get( "https://api.s-recsolutions.com/v1/command/command", datos )
  .done(function( jsonComando ) {


      for(let uso of jsonComando){
          if(jQuery.inArray(uso.commandName, comandos) == -1 && uso.commandName!=""){
              comandos.push(uso.commandName);
          }
      }
      var listaComandos=$("#selectComandos4");
      for(let comando of comandos){

          listaComandos.append("<option>"+comando+"</option>")
      }
  });



}



function cargarSelectComandos3(){

  var datos = { method: 'GET',
              apiKey:"02d5214506fa468484e962868800395f",
              userPwd:userPwd,
              profileID:profileId
 };
 var comandos=[];

  $.get( "https://api.s-recsolutions.com/v1/command/command", datos )
  .done(function( jsonComando ) {


      for(let uso of jsonComando){
          if(jQuery.inArray(uso.commandName, comandos) == -1 && uso.commandName!=""){
              comandos.push(uso.commandName);
          }
      }
      var listaComandos=$("#selectComandos3");
      for(let comando of comandos){

          listaComandos.append("<option>"+comando+"</option>")
      }
  });



}


function cargarGraficaUsuarios(){
  var graficaUsuarios=$('#apexBar'); //cojo la gráfica en el HTML
  var tablaUsuarios=$("#dataTableExample2");
  var analiticaFechas=localStorage.getItem("analiticaFechas");
  if(analiticaFechas=="tabla"){
    eliminarPaginacion();
    tablaUsuarios.remove();
    graficaUsuarios.remove();
  }
  else {
    eliminarPaginacion();
    tablaUsuarios.remove();
    graficaUsuarios.remove();
    var apexBar=$("<div id='apexBar'></div>");

  }




  var datos = {
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:"69637182",
                profileID:"1268900770"
   };


    $.get( "https://pre.s-recsolutions.com/v1/command/use", datos ) //realizo la peticion de todos los usos
    .done(function( jsonComando ) {

     var selectUsuarios=$("#selectUsuarios").val(); //cojo el valor de los select de la lista de comandos y usuarios
     var selectComandos=$("#selectComandos").val();

     var fecha1=$("#dashboardDate").datepicker('getDate'); //cojo las fechas seleccionadas
     var fecha2=$("#dashboardDate2").datepicker('getDate');


      fecha1=formatDate(fecha1);
      fecha2=formatDate(fecha2);




    var listDate = []; //creo una lista vacia de fechas para después colocarlas en la gráfica y realizar cálculos de usos de comando a partir de ellas
      var startDate =fecha1;
      var endDate = fecha2;


      var dateMove = new Date(startDate);
      var strDate = startDate;

    //Este algoritmo mete las fechas comprendidas entre las dos fechas seleccionadas por el usuario incluyendo ambas en el array de fechas

    while (strDate <= endDate){


      strDate=formatDate(dateMove);



      strDate=strDate.replaceAll("-","/");
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate()+1);

      strDate=formatDate(dateMove);


    };





     //a partir de aqui habria que comprobar fecha, usuario y comando seleccionado para guardar la cantidad de usos que tienen e imprimirlo en la gráfica
     var fechas=[];
     var datos=[];
     var label;
     var idUso=0;
    for(let usoComando of jsonComando){


      var fecha=usoComando.timestamp;
      var año=fecha.substr(0,4);
      var mes=fecha.substr(5,2);
      var dia=fecha.substr(8,2);
      fecha=mes+"/"+dia+"/"+año;
      var usuario=usoComando.userName;
      var comando=usoComando.commandName;
      if(idUso!=usoComando.usageID){
        idUso=usoComando.usageID;
        if(listDate.includes(fecha)&&usuario==selectUsuarios&&comando==selectComandos){
          fechas.push(fecha);
          label=usuario+"/"+comando;
        }
        else if(selectComandos=="Todos"&&selectUsuarios=="Todos"&&listDate.includes(fecha)){
          fechas.push(fecha);
          label="Todos/Todos";
        }
        else if(selectComandos=="Todos"&&selectUsuarios==usuario&&listDate.includes(fecha)){
          fechas.push(fecha);
          label=usuario+"/Todos";
        }
        else if(selectComandos==comando&&selectUsuarios=="Todos"&&listDate.includes(fecha)){
          fechas.push(fecha);
          label="Todos/"+comando;
        }
      }

    }


var listaFechasAux=[];
    for(let fecha of listDate){
      var search = fecha;

      var count = fechas.reduce(function(n, val) {
        return n + (val === search);

        }, 0);

      datos.push(count);
      fecha=fecha+" 02:00";
      listaFechasAux.push(fecha);

    }


var analiticaFechas=localStorage.getItem("analiticaFechas");

if(analiticaFechas=="grafica"){
  var filaFechas=$("#filaFechas");
  filaFechas.append(apexBar);
  var options = {
    chart: {
      type: 'line',
      height: '320',
      parentHeightOffset: 0
    },
    colors: [colorPrimario],
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: 0
      }
    },
    series: [{
      name: label, //determina el nombre de la seleccion del usuario (usuario/comando)
      data: datos //aqui iria el numero de usos de un comando por usuario enlazado con los días en el eje X Ejemplo: [4,5,1]
    }],
    yaxis:{


        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          }
        }

    },
    xaxis: {
      labels: {
        format: 'dd MMM',

      },
      type: 'datetime',
      categories: listaFechasAux //aqui va la lista de fechas que tienen que coincidir con los datos de arriba ['10/10/2020','10/11/2020','10/12/2020']
    }
    ,stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    }
  }

  var apexBarChart = new ApexCharts(document.querySelector("#apexBar"), options);

  apexBarChart.render();
}


else {
  var filaFechas=$("#filaFechas");


  var tablaRes=$('<div class="table-responsive">');
  tablaRes.addClass("table-responsive");
  var tabla=$("<table id='dataTableExample2' class='table'>");
      var thead=$("<thead class='bg-primary'>");
      var trhead=$("<tr>");
      var thFecha=$("<th>Fecha</th>");
      thFecha.addClass("text-white");
      var thValor=$("<th>Usos</th>");
      thValor.addClass("text-white");

      trhead.append(thFecha);
      trhead.append(thValor);
      thead.append(trhead);
      tabla.append(thead);


      var tbody=$("<tbody>");
  for(let i=0;i<datos.length;i++){

    var tr=$("<tr>");
    var tdFecha=$("<td>");
    var tdValor=$("<td>");

    tdFecha.append(listDate[i]);
    tdValor.append(datos[i]);
    tr.append(tdFecha);
    tr.append(tdValor);
    tbody.append(tr);
  }

  tabla.append(tbody);
  tablaRes.append(tabla);
  filaFechas.append(tablaRes);

  paginar();
}



});
}





function cargarGraficaUsuarios2(){
  var graficaUsuarios=$('#apexBar2'); //cojo la gráfica en el HTML
  var tablaUsuarios=$("#dataTableExample4");
  var analiticaUsuarios=localStorage.getItem("analiticaUsuarios");

  if(analiticaUsuarios==null){
    analiticaUsuarios=localStorage.setItem("analiticaUsuarios","grafica");
  }

  if(analiticaUsuarios=="tabla"){
    eliminarPaginacion3();
    tablaUsuarios.remove();
    graficaUsuarios.remove();
  }
  else {
    eliminarPaginacion3();
    tablaUsuarios.remove();
    graficaUsuarios.remove();
    var apexBar2=$("<div id='apexBar2'></div>");

  } //y la vacío para que no quede nada de peticiones anteriores


/*"  <div id='apexBar2'></div>"+ */

  var datos = {
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:"69637182",
                profileID:"1268900770"
   };


    $.get( "https://pre.s-recsolutions.com/v1/command/use", datos ) //realizo la peticion de todos los usos
    .done(function( jsonComando ) {


     var fecha1=$("#dashboardDate3").datepicker('getDate'); //cojo las fechas seleccionadas
     var fecha2=$("#dashboardDate4").datepicker('getDate');




     fecha1=formatDate(fecha1);
      fecha2=formatDate(fecha2);





       //las convierto en string


     var listDate = []; //creo una lista vacia de fechas para después colocarlas en la gráfica y realizar cálculos de usos de comando a partir de ellas
      var startDate =fecha1;
      var endDate = fecha2;

      var dateMove = new Date(startDate);
      var strDate = startDate;

    //Este algoritmo mete las fechas comprendidas entre las dos fechas seleccionadas por el usuario incluyendo ambas en el array de fechas

    while (strDate <= endDate){


      strDate=formatDate(dateMove);



      strDate=strDate.replaceAll("-","/");
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate()+1);

      strDate=formatDate(dateMove);


    };




     //a partir de aqui habria que comprobar fecha, usuario y comando seleccionado para guardar la cantidad de usos que tienen e imprimirlo en la gráfica

     var datos=[];
     var label;
     var idUso=0;
     var usuarios=[];
     var todosUsuarios=[];

    for(let usoComando of jsonComando){


      var fecha=usoComando.timestamp;
      var año=fecha.substr(0,4);
      var mes=fecha.substr(5,2);
      var dia=fecha.substr(8,2);
      fecha=mes+"/"+dia+"/"+año;

      var usuario=usoComando.userName;

     if(usuarios.includes(usuario)==false&&usuario!=""){
       usuarios.push(usuario);
     }

      if(idUso!=usoComando.usageID){
        idUso=usoComando.usageID;

        if(listDate.includes(fecha)){

          todosUsuarios.push(usuario);

        }

      }

    }


    label="Usos";


    for(let usuario of usuarios){
      var search = usuario;

      var count = todosUsuarios.reduce(function(n, val) {
        return n + (val === search);

        }, 0);

        datos.push(count);
    }


    var analiticaUsuarios=localStorage.getItem("analiticaUsuarios");
    var filaUsuarios=$("#filaUsuarios");
    if(analiticaUsuarios=="grafica"){
      filaUsuarios.append(apexBar2);
      var options = {
        chart: {
          type: 'line',
          height: '320',
          parentHeightOffset: 0
        },
        colors: [colorPrimario],
        grid: {
          borderColor: "rgba(77, 138, 240, .1)",
          padding: {
            bottom: 0
          }
        },
        series: [{
          name: label, //determina el nombre de la seleccion del usuario (usuario/comando)
          data: datos //aqui iria el numero de usos de un comando por usuario enlazado con los días en el eje X Ejemplo: [4,5,1]
        }],
        yaxis:{


          labels: {
            formatter: function(val) {
              return val.toFixed(0);
            }
          }

      },
        xaxis: {
          type: 'date',
          categories: usuarios //aqui va la lista de fechas que tienen que coincidir con los datos de arriba ['10/10/2020','10/11/2020','10/12/2020']
        }
        ,stroke: {
          width: 3,
          curve: "smooth",
          lineCap: "round"
        }
      }

      var apexBarChart = new ApexCharts(document.querySelector("#apexBar2"), options);

      apexBarChart.render();
    }

    else {
      var tablaRes=$("<div class='table-responsive'>");

      var tabla=$("<table id='dataTableExample4' class='table'> ");
      var thead=$("<thead class='bg-primary'>");
      var trhead=$("<tr>");
      var thFecha=$("<th>Usuario</th>");
      thFecha.addClass("text-white");
      var thValor=$("<th>Usos</th>");
      thValor.addClass("text-white");

      trhead.append(thFecha);
      trhead.append(thValor);
      thead.append(trhead);
      tabla.append(thead);


      var tbody=$("<tbody>");
  for(let i=0;i<datos.length;i++){

    var tr=$("<tr>");
    var tdFecha=$("<td>");
    var tdValor=$("<td>");

    tdFecha.append(usuarios[i]);
    tdValor.append(datos[i]);
    tr.append(tdFecha);
    tr.append(tdValor);
    tbody.append(tr);
  }

  tabla.append(tbody);
  tablaRes.append(tabla);
  filaUsuarios.append(tablaRes);

  paginar3();
    }





});
}





function cargarGraficaHorasUsos(){

  var graficaUsuarios=$('#apexBar4'); //cojo la gráfica en el HTML
  var tablaUsuarios=$("#dataTableExample3");
  var analiticaHoras=localStorage.getItem("analiticaHoras");
  if(analiticaHoras=="tabla"){
    eliminarPaginacion2();
    tablaUsuarios.remove();
    graficaUsuarios.remove();
  }
  else {
    eliminarPaginacion2();
    tablaUsuarios.remove();
    graficaUsuarios.remove();
    var apexBar4=$("<div id='apexBar4'></div>");

  }

  if(analiticaHoras==null){
    analiticaHoras=localStorage.setItem("analiticaHoras","grafica");
  }


  var graficaHoras=$('#apexBar4');
  graficaHoras.empty();

  var datos = {
      apiKey:"02d5214506fa468484e962868800395f",
      userPwd:"69637182",
      profileID:"1268900770"
    };

  $.get( "https://pre.s-recsolutions.com/v1/command/use", datos ) //realizo la peticion de todos los usos
  .done(function( jsonComando ) {


    var selectUsuarios=$("#selectUsuarios4").val(); //cojo el valor de los select de la lista de comandos y usuarios
    var selectComandos=$("#selectComandos4").val();

    var fecha1=$("#dashboardDate7").datepicker('getDate'); //cojo las fechas seleccionadas
    var fecha2=$("#dashboardDate8").datepicker('getDate');

    fecha1=formatDate(fecha1);
    fecha2=formatDate(fecha2);



       //las convierto en string


     var listDate = []; //creo una lista vacia de fechas para después colocarlas en la gráfica y realizar cálculos de usos de comando a partir de ellas
      var startDate =fecha1;
      var endDate = fecha2;



      var dateMove = new Date(startDate);
      var strDate = startDate;



    //Este algoritmo mete las fechas comprendidas entre las dos fechas seleccionadas por el usuario incluyendo ambas en el array de fechas

    while (strDate <= endDate){


      strDate=formatDate(dateMove);



      strDate=strDate.replaceAll("-","/");
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate()+1);

      strDate=formatDate(dateMove);


    };


    var horas=[];
     var datos=[];
     var label;
     var idUso=0;
    for(let usoComando of jsonComando){


      var fecha=usoComando.timestamp;
      var fecha2=usoComando.timestamp;
      var año=fecha.substr(0,4);
      var mes=fecha.substr(5,2);
      var dia=fecha.substr(8,2);
      fecha=mes+"/"+dia+"/"+año;
      var usuario=usoComando.userName;
      var comando=usoComando.commandName;




      if(idUso!=usoComando.usageID){
        idUso=usoComando.usageID;


        var hora=fecha2.substr(11,2);

        var huso=fecha2.substr(25,1);
        if(huso==1){
          hora=+hora+1;
        }
        else if(huso==2){
          hora=+hora+2;
        }




        if(listDate.includes(fecha)&&usuario==selectUsuarios&&comando==selectComandos){

          label=usuario+"/"+comando;
          horas.push(hora);
        }

        else if(selectComandos=="Todos"&&selectUsuarios=="Todos"&&listDate.includes(fecha)){

          label="Todos/Todos";
          horas.push(hora);
        }


        else if(selectComandos=="Todos"&&selectUsuarios==usuario&&listDate.includes(fecha)){
         label=usuario+"/Todos"
          horas.push(hora);
        }

        else if(selectComandos==comando&&selectUsuarios=="Todos"&&listDate.includes(fecha)){
          label="Todos/"+comando
           horas.push(hora);
         }
         else {
           label=" ";
         }

      }

    }

    var contadorHoras=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


    for(let hora of horas){
      contadorHoras[hora]++;
    }
var horasDia=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'
,'18:00','19:00','20:00','21:00','22:00','23:00'];
var filaHoras=$("#filaHoras");
filaHoras.append(apexBar4);
if(analiticaHoras=="grafica"){


  var options = {
    chart: {
      type: 'line',
      height: '320',
      parentHeightOffset: 0
    },
    colors: [colorPrimario],
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: 0
      }
    },
    series: [{
      name: label, //determina el nombre de la seleccion del usuario (usuario/comando)
      data: contadorHoras //aqui iria el numero de usos de un comando por usuario enlazado con los días en el eje X Ejemplo: [4,5,1]
    }],

    yaxis:{


      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      }

  },
    xaxis: {
      type: 'string',
      categories: horasDia //aqui va la lista de fechas que tienen que coincidir con los datos de arriba ['10/10/2020','10/11/2020','10/12/2020']
    }
    ,stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    }
  }

  var apexBarChart = new ApexCharts(document.querySelector("#apexBar4"), options);

  apexBarChart.render();
}

else {
  var tablaRes=$('<div class="table-responsive">');
  tablaRes.addClass("table-responsive");
  var tabla=$("<table id='dataTableExample3' class='table'>");
      var thead=$("<thead class='bg-primary'>");
      var trhead=$("<tr>");
      var thHoras=$("<th>Horas</th>");
      thHoras.addClass("text-white");
      var thValor=$("<th>Usos</th>");
      thValor.addClass("text-white");

      trhead.append(thHoras);
      trhead.append(thValor);
      thead.append(trhead);
      tabla.append(thead);


      var tbody=$("<tbody>");
  for(let i=0;i<horasDia.length;i++){

    var tr=$("<tr>");
    var tdFecha=$("<td>");
    var tdValor=$("<td>");

    tdFecha.append(horasDia[i]);
    tdValor.append(contadorHoras[i]);
    tr.append(tdFecha);
    tr.append(tdValor);
    tbody.append(tr);
  }

  tabla.append(tbody);
  tablaRes.append(tabla);
  filaHoras.append(tablaRes);

  paginar2();
}



});

}


function cargarSeleccionGraficas(){

      var cajaSelecciones=$("#cajaSelecciones");
      var cajaSeleccionados=$("#cajaSeleccionados");






    for(let analitica of analiticasDisponibles){

      var comandoLocalStorage=localStorage.getItem(analitica.nombre);
      if(comandoLocalStorage==null){
        comandoLocalStorage=localStorage.setItem(analitica.nombre,0);
      }
      analitica.orden=comandoLocalStorage;

    }

    analiticasDisponibles.sort((a, b) => (a.orden > b.orden) ? -1 : 1)

    for(let analitica of analiticasDisponibles){
      if(analitica.orden==0){
        cajaSelecciones.append("<div class='form-check'>"+
        "<input class='form-check-input' type='checkbox' id='"+analitica.nombre+"' value='"+analitica.nombre+"'>"+
        "<label class='form-check-label mr-5' for='"+analitica.nombre+"'>"+analitica.titulo+"</label>"+
        "</div>");
      }

      else {
        cajaSeleccionados.append("<h6 class='my-2' id='titulo"+analitica.id+"'>"+analitica.titulo+"<button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,"+analitica.id+")'><img src='assets/images/x.svg'/></button></h6>");
      }
    }



      /*if(comandosFechas!=0){

        cajaSeleccionados.append("<h6 id='fechasSeleccionada' class='my-2'>Uso de comandos por fechas <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;fecha&quot;)'><img src='assets/images/x.svg'/></button></h6>");


      }

      else {
        cajaSelecciones.append("<div class='form-check'>"+
        "<input class='form-check-input' type='checkbox' id='comandosFechas' value='comandosFechas'>"+
        "<label class='form-check-label mr-5' for='comandosFechas'>Uso de comandos por fechas</label>"+
        "</div>");


      }


      if(comandosHoras!=0){
        cajaSeleccionados.append("<h6 id='horasSeleccionada' class='my-2'>Uso de comandos por horas <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;hora&quot;)'><img src='assets/images/x.svg'/></button></h6>");

      }

      else {
        cajaSelecciones.append("<div class='form-check '>"+
        "<input class='form-check-input' type='checkbox' id='comandosHoras' value='comandosHoras'>"+
        "<label class='form-check-label mr-5' for='comandosHoras'>Uso de comandos por horas</label>"+
        "</div>");


      }


      if(comandosUsuarios!=0){
        cajaSeleccionados.append("<h6 id='usuariosSeleccionada' class='my-2'>Uso de comandos por usuarios <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;usuario&quot;)'><img src='assets/images/x.svg'/></button></h6>");

      }

      else {
        cajaSelecciones.append("<div class='form-check '>"+
        "<input class='form-check-input' type='checkbox' id='comandosUsuarios' value='comandosUsuarios'>"+
        "<label class='form-check-label mr-5' for='comandosUsuarios'>Uso de comandos por usuarios</label>"+
        "</div>");


      }


      if(comandosProblemas!=0){
        cajaSeleccionados.append("<h6 id='problemasSeleccionada' class='my-2'>Uso de comandos con problemas <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;problema&quot;)'><img src='assets/images/x.svg'/></button></h6>");

      }

      else {
        cajaSelecciones.append("<div class='form-check '>"+
        "<input class='form-check-input' type='checkbox' id='comandosProblemas' value='comandosProblemas'>"+
        "<label class='form-check-label mr-5' for='comandosProblemas'>Uso de comandos con problemas</label>"+
        "</div>");


      }*/





}




function comprobarGraficasSeleccionadas(accion,idEliminado){


  var cajaSelecciones=$("#cajaSelecciones");
  var cajaSeleccionados=$("#cajaSeleccionados");
  switch(accion){

    case "subir":

      $("#titulo"+idEliminado).remove();
      var analiticaEliminada = analiticasDisponibles.find(obj => {
        return obj.id === idEliminado
      });



      for(let analitica of analiticasDisponibles){
        if(analitica.id==idEliminado){

          analitica.orden=1;
          localStorage.setItem(analitica.nombre,1);
          cajaSeleccionados.append("<h6 id='titulo"+analitica.id+"' class='my-2'>"+analitica.titulo+
      "<button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,"+analitica.id+")'><img src='assets/images/x.svg'/></button></h6>");
        }
        else if(analitica.orden!=0){
          analitica.orden= +analitica.orden+1;
          localStorage.setItem(analitica.nombre,analitica.orden)
        }

      }

          break;

    case "bajar":

      $("#titulo"+idEliminado).remove();
      var analiticaEliminada = analiticasDisponibles.find(obj => {
        return obj.id === idEliminado
      });



      for(let analitica of analiticasDisponibles){
        if(analitica.id==idEliminado){

          analitica.orden=0;
          localStorage.setItem(analitica.nombre,0);
          cajaSelecciones.append("<div class='form-check'><input class='form-check-input' type='checkbox' id='"+analitica.nombre+"'"+
          "value='"+analitica.nombre+"'><label class='form-check-label mr-5' for='"+analitica.nombre+"'>"+analitica.titulo+"</label></div>");
        }
        else if(analiticaEliminada.orden<analitica.orden){
          analitica.orden= (analitica.orden-1);
          localStorage.setItem(analitica.nombre,analitica.orden)
        }

      }

      cargarOnChangeAnaliticas();






      break;
  }
}



function cargarGraficaFechas(){

  var cajaGraficas=$("#cajaGraficas");

  var analiticaFechas=localStorage.getItem("analiticaFechas");
  if(analiticaFechas==null){
    localStorage.setItem("analiticaFechas","grafica");
  }


    cajaGraficas.append("<div class='row' >"+
    "<div class='col-xl-12 grid-margin stretch-card'>"+
      "<div class='card'>"+
        "<div class='card-body' id='filaFechas'>"+

          "<h6 class='card-title'>Uso de comandos por fechas</h6>"+
          "<div class='row '>"+

            "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
              "<h6>Inicio</h6>"+
              "<div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate'>"+
                "<span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
                "<input type='text' class='form-control'>"+
              "</div>"+
            "</div>"+
            "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
              "<h6>Fin</h6>"+
              "<div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate2'>"+
                "<span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
                "<input type='text' class='form-control'>"+
              "</div>"+
            "</div>"+
            "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
            "<button class='btn btn-link' onclick='cambiarGraficaFecha(&quot;grafica&quot;)'><img src='assets/images/bar-chart-2.svg'/></button>"+
            "<button class='btn btn-link' onclick='cambiarGraficaFecha(&quot;tabla&quot;)'><img src='assets/images/columns.svg'/></button>"+
            "</div>"+
          "</div>"+


          "<div class='row '>"+
           "<div class='col col-2'>"+
              "<div class='form-group'>"+
                "<label for='selectUsuarios'>Usuarios</label>"+
                "<select class='form-control text-dark' id='selectUsuarios'>"+
                  "<option>Todos</option>"+

                "</select>"+
                "</div>"+
            "</div>"+

            "<div class='col col-2'>"+
              "<div class='form-group'>"+
                "<label for='selectComandos'>Comandos</label>"+
                "<select class='form-control text-dark' id='selectComandos'>"+
                  "<option>Todos</option>"+

                "</select>"+
                "</div>"+
            "</div>"+
              "</div>"+

        "</div>"+
      "</div>"+
    "</div>"+


  "</div>");






}


function cargarGraficaHoras(){

  var cajaGraficas=$("#cajaGraficas");


  cajaGraficas.append("<div class='row'>"+
  "<div class='col-xl-12 grid-margin stretch-card'>"+
    "<div class='card'>"+
      "<div class='card-body' id='filaHoras'>"+

        "<h6 class='card-title'>Uso de comandos por horas</h6>"+
        "<div class='row '>"+

          "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
            "<h6>Inicio</h6>"+
            "<div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate7'>"+
              "<span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
              "<input type='text' class='form-control'>"+
            "</div>"+
          "</div>"+
          "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
            "<h6>Fin</h6>"+
            "<div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate8'>"+
              "<span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
              "<input type='text' class='form-control'>"+
            "</div>"+
          "</div>"+
            "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
            "<button class='btn btn-link' onclick='cambiarGraficaHoras(&quot;grafica&quot;)'><img src='assets/images/bar-chart-2.svg'/></button>"+
            "<button class='btn btn-link' onclick='cambiarGraficaHoras(&quot;tabla&quot;)'><img src='assets/images/columns.svg'/></button>"+
            "</div>"+
        "</div>"+


        "<div class='row '>"+
          "<div class='col col-2'>"+
          "  <div class='form-group'>"+
            "  <label for='selectUsuarios'>Usuarios</label>"+
              " <select class='form-control text-dark' id='selectUsuarios4'>"+
              " <option>Todos</option>"+

                "  </select>"+
              "  </div>"+
         " </div>"+

          " <div class='col col-2'>"+
           " <div class='form-group'>"+
            " <label for='selectUsuarios'>Comandos</label>"+
              " <select class='form-control text-dark' id='selectComandos4'>"+
              " <option>Todos</option>"+

                "</select>"+
              " </div>"+
              "</div>"+

" </div>"+



        " </div>"+
      "</div>"+
    "</div>"+


  "</div>");

}


function cargarDatosGraficaFechas(){
  if(comandosFechas!=0){




    cargarGraficaFechas();

    if($('#dashboardDate').length) {

      $('#dashboardDate').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: '01-01-2021'

      });
      $('#dashboardDate').datepicker('setDate', week);

    }

    if($('#dashboardDate2').length) {

      $('#dashboardDate2').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: week

      });
      $('#dashboardDate2').datepicker('setDate', today);

    }



    cargarSelectUsuarios();
    cargarSelectComandos();
    cargarGraficaUsuarios();
  }
}


function cargarDatosGraficaHoras(){
  if(comandosHoras!=0){




    cargarGraficaHoras();

    if($('#dashboardDate7').length) {

      $('#dashboardDate7').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: '01-01-2021'

      });
      $('#dashboardDate7').datepicker('setDate', week);

    }

    if($('#dashboardDate8').length) {

      $('#dashboardDate8').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: week

      });
      $('#dashboardDate8').datepicker('setDate', today);

    }



    cargarSelectUsuarios4();
    cargarSelectComandos4();
    cargarGraficaHorasUsos();
  }
}

function cargarGraficasUsuarios(){
  var cajaGraficas=$("#cajaGraficas");


  cajaGraficas.append("<div class='row'>"+
  "<div class='col-xl-12 grid-margin stretch-card'>"+
    "<div class='card'>"+
    "<div class='card-body' id='filaUsuarios'>"+

      "<h6 class='card-title'>Uso de comandos por usuarios</h6>"+
        "<div class='row '>"+

        " <div class='col col-xl-3 col-lg-4 col-md-6'>"+
          " <h6>Inicio</h6>"+
            " <div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate3'>"+
            " <span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
              "<input type='text' class='form-control'>"+
              " </div>"+
            " </div>"+
          " <div class='col col-xl-3 col-lg-4 col-md-6'>"+
          " <h6>Fin</h6>"+
            " <div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate4'>"+
            " <span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
              "<input type='text' class='form-control'>"+
              "   </div>"+
            "  </div>"+
            "<div class='col col-xl-3 col-lg-4 col-md-6'>"+
            "<button class='btn btn-link' onclick='cambiarGraficaUsuarios(&quot;grafica&quot;)'><img src='assets/images/bar-chart-2.svg'/></button>"+
            "<button class='btn btn-link' onclick='cambiarGraficaUsuarios(&quot;tabla&quot;)'><img src='assets/images/columns.svg'/></button>"+
            "</div>"+
          " </div>"+






        " </div>"+
      "</div>"+
    " </div>"+



"</div>");


}

function cargarDatosGraficasUsuarios(){
  if(comandosUsuarios!=0){

    cargarGraficasUsuarios();

    if($('#dashboardDate3').length) {

      $('#dashboardDate3').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: '01-01-2021'

      });
      $('#dashboardDate3').datepicker('setDate', week);

    }

    if($('#dashboardDate4').length) {

      $('#dashboardDate4').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: week

      });
      $('#dashboardDate4').datepicker('setDate', today);

    }

    cargarGraficaUsuarios2();
  }
}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


function cargarGraficas(){

  var cajaGraficas=$("#cajaGraficas");
  cajaGraficas.empty();

  for(let grafica of listaGraficas){

    if(grafica.grafica=="comandosFechas"){
      cargarDatosGraficaFechas();
    }
    else if(grafica.grafica=="comandosHoras"){
      cargarDatosGraficaHoras();
    }

    else if(grafica.grafica=="comandosUsuarios"){
      cargarDatosGraficasUsuarios();
    }

    else if(grafica.grafica="comandosProblemas"){
      cargarDatosGraficaProblemas();
    }





  }
}

// function recargarPagina(){
//   window.location.replace("https://www.s-recsolutions.com/dashboard/amaquia/principal.html");
// }


/*function cargarOnChangeFechas(){
  $("#comandosFechas").change(function(){




    if($(this).is(':checked')){
     var cajaSeleccionados=$("#cajaSeleccionados");
      localStorage.setItem("comandosFechas", 1);
      comandosFechas=localStorage.getItem("comandosFechas");
      cajaSeleccionados.append("<h6 id='fechasSeleccionada' class='my-2'>Uso de comandos por fechas"+
      "<button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;fecha&quot;)'><img src='assets/images/x.svg'/></button></h6>");
      var cajaFechas=$("#cajaSelecciones #comandosFechas").parent();
      cajaFechas.remove();
      comprobarGraficasSeleccionadas("subir","fecha");
    }
    else {
      var numero=localStorage.getItem("comandosFechas");
      localStorage.setItem("comandosFechas", 0);
      comprobarGraficasSeleccionadas("bajar",numero);
    }
  });
}


function cargarOnChangeHoras(){
  $("#comandosHoras").change(function(){




    if($(this).is(':checked')){
      var cajaSeleccionados=$("#cajaSeleccionados");
      localStorage.setItem("comandosHoras", 1);
      comandosHoras=localStorage.getItem("comandosHoras");
      cajaSeleccionados.append("<h6 id='horasSeleccionada' class='my-2'>Uso de comandos por horas"+
       "<button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;hora&quot;)'><img src='assets/images/x.svg'/></button></h6>");
       var cajaHoras=$("#cajaSelecciones #comandosHoras").parent();
       cajaHoras.remove();
      comprobarGraficasSeleccionadas("subir","hora");
    }
    else {
      var numero=localStorage.getItem("comandosHoras");
      localStorage.setItem("comandosHoras", 0);
       comprobarGraficasSeleccionadas("bajar",numero);

    }
  });
}


function cargarOnChangeUsuarios(){
  $("#comandosUsuarios").change(function(){




    if($(this).is(':checked')){
      var cajaSeleccionados=$("#cajaSeleccionados");
      localStorage.setItem("comandosUsuarios", 1);
      comandosUsuarios=localStorage.getItem("comandosUsuarios");
      cajaSeleccionados.append("<h6 id='usuariosSeleccionada' class='my-2'>Uso de comandos por usuarios <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;usuario&quot;)'><img src='assets/images/x.svg'/></button></h6>");
       var cajaUsuarios=$("#cajaSelecciones #comandosUsuarios").parent();
       cajaUsuarios.remove();
      comprobarGraficasSeleccionadas("subir","usuario");
    }
    else {

      var numero=localStorage.getItem("comandosUsuarios");
      localStorage.setItem("comandosUsuarios", 0);
       comprobarGraficasSeleccionadas("bajar",numero);
    }
  });
}


function cargarOnChangeProblemas(){
  $("#comandosProblemas").change(function(){




    if($(this).is(':checked')){
      var cajaSeleccionados=$("#cajaSeleccionados");
      localStorage.setItem("comandosProblemas", 1);
      comandosProblemas=localStorage.getItem("comandosProblemas");
      cajaSeleccionados.append("<h6 id='problemasSeleccionada' class='my-2'>Uso de comandos con problemas <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,&quot;problema&quot;)'><img src='assets/images/x.svg'/></button></h6>");
       var cajaProblemas=$("#cajaSelecciones #comandosProblemas").parent();
       cajaProblemas.remove();
      comprobarGraficasSeleccionadas("subir","problema");
    }
    else {

      var numero=localStorage.getItem("comandosProblemas");
      localStorage.setItem("comandosProblemas", 0);
       comprobarGraficasSeleccionadas("bajar",numero);
    }
  });
}
*/

function cargarOnChangeAnaliticas(){

  for(let analitica of analiticasDisponibles){
    $("#"+analitica.nombre+"").off('change');
    $("#"+analitica.nombre+"").change(function(){

      if($(this).is(':checked')){
        var cajaSeleccionados=$("#cajaSeleccionados");
        localStorage.setItem(analitica.nombre, 1);

        cajaSeleccionados.append("<h6 id='titulo"+analitica.id+"' class='my-2'>"+analitica.titulo+" <button class='btn btn-link p-0' onclick='comprobarGraficasSeleccionadas(&quot;bajar&quot;,"+analitica.id+")'><img src='assets/images/x.svg'/></button></h6>");
         var cajaProblemas=$("#cajaSelecciones #"+analitica.nombre+"").parent();
         cajaProblemas.remove();
        comprobarGraficasSeleccionadas("subir",analitica.id);
      }

    });
  }

}


function cambiarGraficaFecha(tipo){

  if(tipo=="grafica"){
    localStorage.setItem("analiticaFechas","grafica");

  }
  else if(tipo=="tabla"){
    localStorage.setItem("analiticaFechas","tabla");
  }



    cargarGraficaUsuarios();
}



function paginar() {
  $('#dataTableExample2').DataTable({
    "aLengthMenu": [
      [5, 10, 20, -1],
      [5, 10, 20, "All"]
    ],
    "iDisplayLength": 5,
    "language": {
      search: ""
    }
  });
  $('#dataTableExample2').each(function() {
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

function paginar2() {
  $('#dataTableExample3').DataTable({
    "aLengthMenu": [
      [5, 10, 20, -1],
      [5, 10, 20, "All"]
    ],
    "iDisplayLength": 5,
    "language": {
      search: ""
    }
  });
  $('#dataTableExample3').each(function() {
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

function paginar3() {
  $('#dataTableExample4').DataTable({
    "aLengthMenu": [
      [5, 10, 20, -1],
      [5, 10, 20, "All"]
    ],
    "iDisplayLength": 5,
    "language": {
      search: ""
    }
  });
  $('#dataTableExample4').each(function() {
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


function paginar4() {
  $('#dataTableExample5').DataTable({
    "aLengthMenu": [
      [5, 10, 20, -1],
      [5, 10, 20, "All"]
    ],
    "iDisplayLength": 5,
    "language": {
      search: ""
    }
  });
  $('#dataTableExample5').each(function() {
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
  $('#dataTableExample2_wrapper').remove();
}

function eliminarPaginacion2(){
  $('#dataTableExample3_wrapper').remove();
}

function eliminarPaginacion3(){
  $('#dataTableExample4_wrapper').remove();
}

function eliminarPaginacion(){
  $('#dataTableExample5_wrapper').remove();
}
function cambiarGraficaHoras(tipo){
  /*" <div id='apexBar4'></div>"+*/


if(tipo=="grafica"){
    localStorage.setItem("analiticaHoras","grafica");

  }
  else if(tipo=="tabla"){
    localStorage.setItem("analiticaHoras","tabla");
  }



    cargarGraficaHorasUsos();
}


function cambiarGraficaUsuarios(tipo){
  /*" <div id='apexBar4'></div>"+*/


if(tipo=="grafica"){
    localStorage.setItem("analiticaUsuarios","grafica");

  }
  else if(tipo=="tabla"){
    localStorage.setItem("analiticaUsuarios","tabla");
  }



    cargarGraficaUsuarios2();
}


function formatDate(date) {
  if(date.getMonth()<9){

    var mes="0"+(date.getMonth()+1);

  }
  else {
    var mes=(date.getMonth()+1);
  }

  if(date.getDate()<10){
    var dia="0"+(date.getDate());
  }
  else {
    var dia=(date.getDate());
  }

  date=(mes) + "/" + dia + "/" + date.getFullYear();


  return date;
}



function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}



function cargarDatosGraficaProblemas(){
  if(comandosProblemas!=0){

    cargarTablaProblemas();

    if($('#dashboardDate11').length) {

      $('#dashboardDate11').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: '01-01-2021'

      });
      $('#dashboardDate11').datepicker('setDate', week);

    }

    if($('#dashboardDate12').length) {

      $('#dashboardDate12').datepicker({
        format: "dd-MM-yyyy",
        todayHighlight: true,
        autoclose: true,
        endDate: "today",
        startDate: week

      });
      $('#dashboardDate12').datepicker('setDate', today);

    }

    cargarGraficaProblemas();
  }
}


function cargarTablaProblemas(){

    var cajaGraficas=$("#cajaGraficas");


    cajaGraficas.append("<div class='row'>"+
    "<div class='col-xl-12 grid-margin stretch-card'>"+
      "<div class='card'>"+
      "<div class='card-body' >"+

        "<h6 class='card-title'>Uso de comandos con problemas</h6>"+
          "<div class='row '>"+

          " <div class='col col-xl-3 col-lg-4 col-md-6'>"+
            " <h6>Inicio</h6>"+
              " <div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate11'>"+
              " <span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
                "<input type='text' class='form-control'>"+
                " </div>"+
              " </div>"+
            " <div class='col col-xl-3 col-lg-4 col-md-6'>"+
            " <h6>Fin</h6>"+
              " <div class='input-group date datepicker dashboard-date mr-2 mb-2 mb-md-2 d-md-2 d-xl-flex' id='dashboardDate12'>"+
              " <span class='input-group-addon bg-transparent'><img src='assets/images/calendar.svg'/></span>"+
                "<input type='text' class='form-control'>"+
                "   </div>"+
              "  </div>"+

            " </div>"+



          "<div class='table-responsive' id='filaProblemas'>"+
            "<table class='table' id='dataTableExample5'>"+
            "</table>"+
          "</div>"+


          " </div>"+
        "</div>"+
      " </div>"+



  "</div>");


  }



  function cargarGraficaProblemas(){
    var tablaUsuarios=$("#dataTableExample5");


      eliminarPaginacion();
      tablaUsuarios.remove();







    var datos = {
                  apiKey:"02d5214506fa468484e962868800395f",
                  userPwd:"69637182",
                  profileID:"1268900770"
     };


      $.get( "https://pre.s-recsolutions.com/v1/command/use", datos ) //realizo la peticion de todos los usos
      .done(function( jsonComando ) {


        var fecha1=$("#dashboardDate11").datepicker('getDate'); //cojo las fechas seleccionadas
        var fecha2=$("#dashboardDate12").datepicker('getDate');


         fecha1=formatDate(fecha1);
         fecha2=formatDate(fecha2);




       var listDate = []; //creo una lista vacia de fechas para después colocarlas en la gráfica y realizar cálculos de usos de comando a partir de ellas
         var startDate =fecha1;
         var endDate = fecha2;


         var dateMove = new Date(startDate);
         var strDate = startDate;

       //Este algoritmo mete las fechas comprendidas entre las dos fechas seleccionadas por el usuario incluyendo ambas en el array de fechas

       while (strDate <= endDate){


         strDate=formatDate(dateMove);



         strDate=strDate.replaceAll("-","/");
         listDate.push(strDate);
         dateMove.setDate(dateMove.getDate()+1);

         strDate=formatDate(dateMove);


       };



     var idUso=0;

    var filaProblemas=$("#filaProblemas");
       filaProblemas.append("<table id='dataTableExample5' class='table'>");
       var tabla=$("#dataTableExample5");
       tabla.append("<thead class='bg-primary'><tr>"+
       "<th class='text-white'>Comando</th>"+
       "<th class='text-white'>Fecha</th>"+
       "<th class='text-white'>Ver más</th>"+
       "</tr></thead><tbody id='tbodyProblemas'></tbody>");
       var tbody=$("#tbodyProblemas");
    for(let usoComando of jsonComando){
      if(idUso!=usoComando.usageID){
        idUso=usoComando.usageID;

      var fecha=usoComando.timestamp;
      var año=fecha.substr(0,4);
      var mes=fecha.substr(5,2);
      var dia=fecha.substr(8,2);
      fecha=mes+"/"+dia+"/"+año;
        if(listDate.includes(fecha)){


      tbody.append("<tr>"+
      "<td>"+usoComando.commandName+"</td>"+
      "<td>"+fecha+"</td>"+
      "<td><button class='btn btn-primary' onclick='abrirEjecucionUso("+usoComando.usageID+","+usoComando.commandID+")'>Ver más</button></td>"+
      "</tr>");
    }
      }

    }

    paginar4();
      });
  }


  function abrirEjecucionUso(idUso,idComando){
    localStorage.setItem("usageID", idUso);
    localStorage.setItem("commandID", idComando);

    localStorage.removeItem("commandName");
    // window.open("https://www.s-recsolutions.com/dashboard/amaquia/usos.html","myWindow","width="+screen.availWidth+",height="+screen.availHeight);

  }
