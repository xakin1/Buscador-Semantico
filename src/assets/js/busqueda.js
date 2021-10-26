


    
function buscar(){
    var busqueda=$("#busqueda").val();
    var tabla=$("#tablaStock");
    var datos={
        apiKey:"fb8c0159508e4e3bb1fd98162f7228bf",
        userPwd:"69637182",
        profileID:"1268900770",
        filter:{
            search:busqueda
        }
    }

    fetch("https://api.s-recsolutions.com/v1/search", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(datos)
      }).then(function(response) {
        
        return response.text();
      
      
      
      })
      
      .then(function(text) {
        alert(text);
      })
      
      .catch(function(error) {
       /*
       <tbody>
                      <tr>
                        <td></td>
                        <td>Error en la toma de datos del servidor</td>
                        <td></td>
                      </tr>
                    </tbody>
       */

       var tbody=$("<tbody>")
       var tr=$("<tr>");
       var td1=$("<td>");
       var td2=$("<td>");
       var td3=$("<td>");
       td2.append("<h5>Error en la toma de datos del servidor</h5>");
       tr.append(td1);
       tr.append(td2);
       tr.append(td3);
       tbody.append(tr);
       tabla.append(tbody);
      })
      ;
}
    


