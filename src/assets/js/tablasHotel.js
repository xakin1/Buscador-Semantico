$(function() {
    'use strict';

    var datos = {
    apiKey:"02d5214506fa468484e962868800395f",
    userPwd:'69637182',
    profileID:'1268900770'
};


$.get( "https://pre.s-recsolutions.com/v1/command/command", datos )
.done(function( jsonComando ) {
      console.log(jsonComando);
      var tabla=$('#dataTableExample');
      var thead=$("<thead>");
      var trhead=$("<tr>");
      var thComando=$("<th>Comando</th>");
      thComando.addClass("text-white");
      var thUso=$("<th>Uso</th>");
      thUso.addClass("text-white");
      var thHora=$("<th>Hora</th>")
      thHora.addClass("text-white");
      var thInfo=$("<th>Info</th>")
      thInfo.addClass("text-white");
      var tbody=$("<tbody>");
      trhead.append(thComando);
      trhead.append(thUso);
      trhead.append(thHora);
      trhead.append(thInfo);
      thead.append(trhead);
      tabla.append(thead);


      for(let datos of jsonComando){
          if(datos.problem==true){
            if(datos.commandName!=""){

                var tr=$("<tr>");
        var tdComando="<td>"+datos.commandName+"</td>";
        var nombreComando="\""+datos.commandName+"\"";
        var tdInfo="<td><button class='btn btn-primary' href='#' onclick='abrirEjecucionUso("+datos.usageID+","+nombreComando+")'>Ver más</button></td>";
        if(huso==1){
            hora=+hora+1;
        }
        else if(huso==2){
            hora=+hora+2;
        }

        tr.append(tdComando);
        tr.append(tdUso);
        tr.append(tdHora);
        tr.append(tdInfo);
        tbody.append(tr);
            }


    }
      }

      tabla.append(tbody);
      paginar();
    });

  });


  function paginar() {
    $('#dataTableExample').DataTable({
      "aLengthMenu": [
        [5, 10, 20, -1],
        [5, 10, 20, "All"]
      ],
      "iDisplayLength": 5,
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


  function abrirEjecucionUso(idUso,nombreComando){
    localStorage.setItem("usageID", idUso);
    localStorage.setItem("commandName", nombreComando);
    localStorage.removeItem("commandID");
    window.open("https://www.s-recsolutions.com/jorge/hotel/usos.html","myWindow","width="+screen.availWidth+",height="+screen.availHeight);

  }
