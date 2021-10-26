var usageID=localStorage.getItem("usageID");
var commandID=localStorage.getItem("commandID");
var userPwd=getCookie("userPwd");
var profileId=getCookie("profileId");
 var commandName=localStorage.getItem("commandName");


$(function() {
    'use strict'




    if (userPwd != null&& profileId!= null) {

        mostrarTablaEjecucionUso();
    }

    else {
        window.location.replace("https://www.s-recsolutions.com/jorge/hotel/index.html");
    }


});


function mostrarTablaEjecucionUso(){
    var datos = { method: 'GET',
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:'69637182',
                profileID:'1268900770'
   };


        //inicio petición USOS
        $.get( "https://pre.s-recsolutions.com/v1/command/use", datos )
        .done(function( jsonComando ) {

            var tabla=$("#dataTableExample");
            tabla.remove();
            var titulo=$("#titulo");
            titulo.empty();
            titulo.append("Uso de "+jsonComando[0].commandName+" de "+jsonComando[0].userName);
            eliminarPaginacion();
            var div=$("#tablaUsos");
            var tabla=$("<table>")
            tabla.attr("id","dataTableExample");
            tabla.addClass("table");
            div.append(tabla);






            var thead=$("<thead>");
            var trHead=$("<tr>");



            var thInput=$("<th>")
            thInput.addClass("text-white");
            thInput.append("Respuesta del usuario");
            var thOutput=$("<th>");
            thOutput.addClass("text-white");
            thOutput.append("Pregunta del sistema");
            var thHora=$("<th>");
            thHora.addClass("text-white");
            thHora.append("Fecha");



            trHead.append(thOutput);
            trHead.append(thInput);
            trHead.append(thHora);
            thead.append(trHead);
            tabla.append(thead);

            var tbody=$("<tbody>");

            //for(let datos of jsonComando){
              for(let i=0;i<jsonComando.length;i++){

                if(jsonComando[i].usageID==usageID){


                var tr=$("<tr>");


                var tdInput=$("<td>");
                if(jsonComando[i]!=jsonComando[jsonComando.length - 1]){
                  tdInput.append(jsonComando[i+1].input);
                }
                else{
                  tdInput.append("");
                }

                var tdOutput=$("<td>");

                var salida=jsonComando[i].output;
                salida=salida.substring(salida.indexOf(";") + 1);

                tdOutput.append(salida);
                var tdFecha=$("<td>");
                var fecha=jsonComando[i].timestamp;
                var año = fecha.substring(0,4);
                var mes=fecha.substring(5,7);
                var dia=fecha.substring(8,10);
                var hora=fecha.substring(11,13);

                var minutos=fecha.substring(14,16);
                var segundos=fecha.substring(17,19);
                var husoHorario=fecha.substring(25,26);



                if(husoHorario==1){
                  hora=+hora+1;
                }
                else if(husoHorario==2){
                  hora=+hora+2;
                }

                tdFecha.append(año+"-"+mes+"-"+dia+" "+hora+":"+minutos+":"+segundos);




                tr.append(tdOutput);
                tr.append(tdInput);
                tr.append(tdFecha);
                if(jsonComando[i].problem==true){
                    tr.addClass("bg-danger");
                }

                tbody.append(tr);
              }
            }



            tabla.append(tbody);


            paginar();



}).fail(function(data){
  showSwal('hotelUsosComando');


});
}


function paginar() {
    $('#dataTableExample').DataTable({
      "order": [[ 2, "asc" ]],

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

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
