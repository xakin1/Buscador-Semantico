$(document).ready(function() {
    
    

$("#searchForm").on("keyup",function(event){

    if(event.keyCode!=13){
        event.preventDefault();
        var busqueda=$("#searchForm").val();
        cargarContactos(busqueda);
        cargarMensajesBuscados(busqueda);
    }
        
    

});

$('#btnBuscar').click(function() {
    var busqueda=$("#searchForm").val();
    cargarContactos(busqueda);
    cargarMensajesBuscados(busqueda);

});
    
});



var chats=[{
    id:1,
    chat:"Jorge Martínez",
    trabajo:"Back-end developer",
    estado:"online",
    bloqueado:true,
    mensajes:[
        {
            texto:"Hola!",
            emisor:"usuario",
            hora:"16:06"
        },{
            texto:"Hola!",
            emisor:"usuario",
            hora:"16:06"
        }
    ]
},{
    id:2,
    chat:"Manuel Rodríguez",
    trabajo:"Back-end developer",
    estado:"online",
    bloqueado:false,
    mensajes:[
        {
            texto:"dasdasdas!",
            emisor:"usuario",
            hora:"16:06"
        },{
            texto:"Hodasdasdasla!",
            emisor:"usuario",
            hora:"16:06"
        }
    ]
},
{
    id:3,
    chat:"SINVAD",
    trabajo:"BOT",
    estado:"online",
    bloqueado:false,
    mensajes:[]

}


   
    
]


function cargarMensajesBuscados(busqueda=null){
          
    $("#chatMensajes").remove();
    $("#mensajesCoincidentes").remove();
    if(busqueda!=""){


        
        

            var chatsCoincidentes=[];
            var chat=$("#chats");
            var lista=$("<ul>");
            lista.addClass("list-unstyled chat-list px-1");
            lista.attr("id","chatMensajes");
            var p=$("<p>");
            p.attr("id","mensajesCoincidentes");
            p.addClass("text-muted mb-1");
            p.append("Mensajes coincidentes");
            chat.append(p);
            chat.append(lista);
            var encontrado=false;
            for(var chat of chats){
                encontrado=false;
                for(var mensaje of chat.mensajes){
                    var mensajeSinAcentos=mensaje.texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    if(mensaje.texto.toLowerCase().match(busqueda) || mensaje.texto.match(busqueda)){
                        encontrado=true;
                    }
                    else if(mensajeSinAcentos.toLowerCase().match(busqueda) || mensajeSinAcentos.match(busqueda)){
                        encontrado=true;
                    }
                }

                if(encontrado){
                    chatsCoincidentes.push(chat);
                }
            }


            for(var chat of chatsCoincidentes){
                var li=$("<li>");
                        li.addClass("chat-item pr-1");
                        var a=$("<a>");
                        a.addClass("d-flex align-items-center");
                        a.attr("onclick","cargarMensajesContacto("+chat.id+")")
                        a.attr("href","#");
                        var figure=$("<figure>");
                        figure.addClass("mb-0 mr-2");
                        var img=$("<img>");
                        img.addClass("img-xs rounded-circle");
                        img.attr("src","https://via.placeholder.com/37x37");
                        var div=$("<div>");
                        div.addClass("d-flex justify-content-between flex-grow border-bottom");
                        var p=$("<p>");
                        p.addClass("text-body font-weight-bold");
                        p.append(chat.chat);
                        div.append(p);
                        figure.append(img);
                        a.append(figure);
                        a.append(div);
                        li.append(a);
                        lista.append(li);
            }
        

    }
    else {
        return false;
    }
    
}


      /*  function cargarMensajesBuscados(busqueda=null){
          
            $("#chatMensajes").remove();
            $("#mensajesCoincidentes").remove();
            if(busqueda!=""){
                mensajes=[{
                    texto:"Hola!",
                    emisor:"Jorge Martínez",
                    hora:"16:05"
        
                },
                {
                    texto:"Hola!",
                    emisor:"usuario",
                    hora:"16:06"
        
                },
                {
                    texto:"Qué tal?",
                    emisor:"Jorge Martínez",
                    hora:"16:06"
                },
                {
                    texto:"Muy bien!",
                    emisor:"Jorge Martínez",
                    hora:"16:08"
                },
                {
                    texto:"Muy bien!",
                    emisor:"Jorge Martínez",
                    hora:"16:08"
                },
                {
                    texto:"Sevilla-Betis!",
                    emisor:"Jorge Martínez",
                    hora:"16:08"
                },
                {
                    texto:"Muy bien!",
                    emisor:"Jorge Martínez",
                    hora:"16:08"
                },
                {
                    texto:"Muy bien!",
                    emisor:"Jorge Martínez",
                    hora:"16:08"
                }
                ]
                var mensajesCoincidentes=[];
                for(var mensaje of mensajes){

                    var mensajeSinAcentos=mensaje.texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    if(mensaje.texto.toLowerCase().match(busqueda) || mensaje.texto.match(busqueda)){
                        mensajesCoincidentes.push(mensaje);
                        
                    }
                    else if(mensajeSinAcentos.toLowerCase().match(busqueda) || mensajeSinAcentos.match(busqueda)){
                        mensajesCoincidentes.push(mensaje);
                    }
                }

                
                    var chat=$("#chats");
                    var lista=$("<ul>");
                    lista.addClass("list-unstyled chat-list px-1");
                    lista.attr("id","chatMensajes");
                    var p=$("<p>");
                    p.attr("id","mensajesCoincidentes");
                    p.addClass("text-muted mb-1");
                    p.append("Mensajes coincidentes");
                    chat.append(p);
                    chat.append(lista);
                    
                    for(var mensaje of mensajesCoincidentes){

                        if(mensaje.emisor=="usuario"){
                            var autor="Yo";
                        }
                        else {
                            var autor=mensaje.emisor;
                        }

                        var li=$("<li>");
                        li.addClass("chat-item pr-1");
                        var a=$("<a>");
                        a.addClass("d-flex align-items-center");
                        var figure=$("<figure>");
                        figure.addClass("mb-0 mr-2");
                        var img=$("<img>");
                        img.addClass("img-xs rounded-circle");
                        img.attr("src","https://via.placeholder.com/37x37");

                        var div=$("<div>");
                        div.addClass("d-flex justify-content-between flex-grow border-bottom");
                        var p=$("<p>");
                        p.addClass("text-body font-weight-bold");
                        p.append(autor);
                        var mensajeP=$("<p>");
                        mensajeP.addClass("text-muted tx-13");
                        mensajeP.append(mensaje.texto);

                        div.append(p);
                        div.append(mensajeP);
                        figure.append(img);
                        a.append(figure);
                        a.append(div);
                        li.append(a);
                        lista.append(li);
                    
                }
                

            }
            else {
                return false;
            }
            
        }
        */

      function enviarMensaje(event){
        var mensaje=$("#chatForm");
        
        if(mensaje.val()!=""){

        
        momentoActual = new Date();
        hora = momentoActual.getHours();
        minuto = (momentoActual.getMinutes()<10?'0':'') + (momentoActual.getMinutes());
        var spanHora="<span>";
        var cajaMensajes=$("#mensajes");
       
        var li=$("<li>");
        li.addClass("message-item me");
        var imagen=$("<img>");
        imagen.attr("src","https://via.placeholder.com/43x43");
        imagen.addClass("img-xs rounded-circle");
        var divContenido=$("<div>")
        divContenido.addClass("content");
        var divMensaje=$("<div>");
        divMensaje.addClass("message");
        var divBubble=$("<div>")
        divBubble.addClass("bubble");
        var textoMensaje=$("<p>");
        textoMensaje.append(mensaje.texto);
        var spanHora=$("<span>");
        spanHora.append(hora+":"+minuto);

        divBubble.append(mensaje.val());
        divMensaje.append(divBubble);
        divMensaje.append(spanHora);
        divContenido.append(divMensaje);
        li.append(imagen);
        li.append(divContenido);
        cajaMensajes.append(li);
        mensaje.val("");
        cargarContactos();
    }
    else {
        return false;
    }
       
       
      }


function cargarMensajesContacto(id){
    


var mensajes=[];
var cajaChat=$("#cajaChat");
cajaChat.empty();
var form=$("<form>");
var div=$("<div>");
var input=$("<input>");
var div2=$("<div>");
var button=$("<button>");
var icon=$("<i>");


form.addClass("search-form flex-grow mr-2");
div.addClass("input-group");
input.addClass("form-control rounded-pill");
input.attr("id","chatForm");
input.attr("placeholder","Type a message");
input.attr("type","text");
button.attr("type","button");
button.addClass("btn btn-primary btn-icon rounded-circle");
button.attr("id","btnChat");
icon.attr("data-feather","send");

button.append(icon);
div2.append(button);
div.append(input);
form.append(div);
cajaChat.append(form);
cajaChat.append(div2);


var input = document.getElementById("chatForm");
    var btnChat=document.getElementById("btnChat");
    
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
       
        
        enviarMensaje(event);
      }
    });


    btnChat.addEventListener("click", function(event){

        event.preventDefault();
       
        
        enviarMensaje(event);
    });


    if(id==1){

        /*datos={
            nombre:"Jorge Martínez",
            trabajo:"Back-end developer",
            estado:"online",
            bloqueado:true
        }

        mensajes=[{
            texto:"Hola!",
            emisor:"otro",
            hora:"16:05"

        },
        {
            texto:"Hola!",
            emisor:"usuario",
            hora:"16:06"

        },
        {
            texto:"Qué tal?",
            emisor:"otro",
            hora:"16:06"
        },
        {
            texto:"Muy bien!",
            emisor:"usuario",
            hora:"16:08"
        },
        {
            texto:"Muy bien!",
            emisor:"usuario",
            hora:"16:08"
        },
        {
            texto:"Muy bien!",
            emisor:"usuario",
            hora:"16:08"
        },
        {
            texto:"Muy bien!",
            emisor:"usuario",
            hora:"16:08"
        },
        {
            texto:"Muy bien!",
            emisor:"usuario",
            hora:"16:08"
        }
        ]*/

        datos=chats[0];

        
    }
    else if(id==2){

        datos=chats[1];
        /*datos={
            nombre:"Manuel Rodríguez",
            trabajo:"Front-end developer",
            estado:"offline",
            bloqueado:false
        }


        mensajes=[{
            texto:"dasdsadasdasdasadsasdasdas dasasasasasasasasasasasasdasdasdas     dasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda sdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas !",
            emisor:"otro",
            hora:"18:56"

        },
        {
            texto:"Ola!",
            emisor:"usuario",
            hora:"18:58"

        },
        {
            texto:"Cómo vai?",
            emisor:"otro",
            hora:"18:59"
        },
        {
            texto:"Moi ben!",
            emisor:"usuario",
            hora:"19:00"
        }
        ]*/

    }
    else if(id==3){
        /*datos={
            nombre:"SINVAD",
            trabajo:"BOT",
            estado:"online",
            bloqueado:false
        }*/
        datos=chats[2];

    }

    
    var botonBloqueo=document.getElementById("bloquearUsuario");
  
    botonBloqueo.addEventListener("click", function(event){

        cargarMensajesContacto(id);

    });

    var caja=$("#datosUsuario");
    caja.empty();
    var i=$("<i>")
    i.addClass("icon-lg mr-2 ml-n2 text-muted d-lg-none");
    i.attr("id","backToChatList");
    i.attr("data-feather","corner-up-left");
    var figure=$("<figure>");
    figure.addClass("mb-0 mr-2");
    var imagen=$("<img>");
    imagen.attr("src","https://via.placeholder.com/43x43");
    imagen.addClass("img-sm rounded-circle");
    var status=$("<div>");
   status.addClass("status "+datos.estado);
    var divUsuario=$("<div>");
    var usuario=$("<p>");
    usuario.append(datos.chat);
    var trabajoP=$("<p>");
    trabajoP.addClass("text-muted tx-13");
    trabajoP.append(datos.trabajo);
    divUsuario.append(usuario);
    divUsuario.append(trabajoP);
    figure.append(imagen);
    figure.append(status);
   
    caja.append(i);
    caja.append(figure);
    caja.append(divUsuario);
    
    var cajaMensajes=$("#mensajes");
    cajaMensajes.empty();
    var inputChat=$("#chatForm");

    
    for(var mensaje of datos.mensajes){


       
        var li=$("<li>");

        if(mensaje.emisor=="otro"){
            li.addClass("message-item friend");
        }
        else if(mensaje.emisor=="usuario"){
            li.addClass("message-item me");
        }
        var imagen=$("<img>");
        imagen.attr("src","https://via.placeholder.com/43x43");
        imagen.addClass("img-xs rounded-circle");
        var divContenido=$("<div>")
        divContenido.addClass("content");
        var divMensaje=$("<div>");
        divMensaje.addClass("message");
        var divBubble=$("<div>")
        divBubble.addClass("bubble");
        var textoMensaje=$("<p>");
        textoMensaje.append(mensaje.texto);
        var spanHora=$("<span>");
        spanHora.append(mensaje.hora);

        divBubble.append(textoMensaje);
        divMensaje.append(divBubble);
        divMensaje.append(spanHora);
        divContenido.append(divMensaje);
        li.append(imagen);
        li.append(divContenido);
        cajaMensajes.append(li);
    }

    

    if(datos.bloqueado==false){
        cajaMensajes.removeClass();
        cajaMensajes.addClass("messages");
        inputChat.removeAttr("disabled");
        inputChat.attr("placeholder","Type a messagge");

    }

    else if(datos.bloqueado==true){
        button.attr("disabled","disabled");
        inputChat.attr("disabled","disabled");
        inputChat.attr("placeholder","Desbloquea a "+datos.nombre+" para poder chatear con él");
        var li=$("<li>");
        li.addClass("text-center")
       
        var botonDesbloqueo=$("<button>");
        var titulo=$("<h5>");
        titulo.append("Usuario bloqueado");
        botonDesbloqueo.addClass("btn btn-danger");
        botonDesbloqueo.append("Desbloquear");
        li.append(titulo);
        li.append(botonDesbloqueo);
        cajaMensajes.append(li);
        
        botonDesbloqueo.click(function(){

            cargarMensajesContacto(id);
        });
    }
    
}


function cargarContactos(busqueda=null){

    var ul=$("#chatContactos");
    ul.empty();


 var contactosIniciales=[

    {
        id:1,
        nombre:"Jorge Martínez",
        ultimoMensaje:"Hola!",
        horaUltimoMensaje:"16:00",
        mensajesTotales:"6",
        estado:"online"
    },
    {
        id:2,
        nombre:"Manuel Rodríguez",
        ultimoMensaje:"Hola!",
        horaUltimoMensaje:"17:00",
        mensajesTotales:"3",
        estado:"offline"
    }
    ,
    {

        id:3,
        nombre:"SINVAD",
        ultimoMensaje:"",
        horaUltimoMensaje:"",
        mensajesTotales:"",
        estado:"online"

    }
 ];
var contactos=[];
 if(busqueda!=null){
    for(var contacto of contactosIniciales){
   
        var nombreSinAcentos=contacto.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if(contacto.nombre.toLowerCase().match(busqueda) || contacto.nombre.match(busqueda)){
            contactos.push(contacto);
        }
        else if(nombreSinAcentos.toLowerCase().match(busqueda) || nombreSinAcentos.match(busqueda)){
            contactos.push(contacto);
        }

        
    }
 }
 else {
     contactos=contactosIniciales;
 }

 

 contactos.sort(function (b, a) {
    if (a.horaUltimoMensaje > b.horaUltimoMensaje) {
      return 1;
    }
    if (a.horaUltimoMensaje < b.horaUltimoMensaje) {
      return -1;
    }
   
    return 0;
  });

 var ul=$("#chatContactos");
 for(contacto of contactos){
     
     var li=$("<li>");
     li.addClass("chat-item pr-1");
     var a=$("<a>");
     a.attr("onclick","cargarMensajesContacto("+contacto.id+")");
     a.attr("href","#");
     a.addClass("d-flex align-items-center");

     var figure=$("<figure>");
     figure.addClass("mb-0 mr-2");
     var img=$("<img>");
     img.attr("src","https://via.placeholder.com/37x37");
     img.addClass("img-xs rounded-circle");
     var status=$("<div>");
     status.addClass("status "+contacto.estado);
    //
    var divContacto=$("<div>");
    divContacto.addClass("d-flex justify-content-between flex-grow border-bottom");
    var divHijo=$("<div>");
    var ultimoContacto=$("<p>");
    ultimoContacto.addClass("text-body font-weight-bold");
    ultimoContacto.append(contacto.nombre);
    var mensaje=$("<p>");
    mensaje.addClass("text-muted tx-13");
    mensaje.append(contacto.ultimoMensaje);
    //
    var divDatos=$("<div>");
    divDatos.addClass("d-flex flex-column align-items-end");
    var hora=$("<p>");
    hora.addClass("text-muted tx-13 mb-1");
    hora.append(contacto.horaUltimoMensaje);
    var totalMensajes=$("<div>")
    totalMensajes.addClass("badge badge-pill badge-primary ml-auto");
    totalMensajes.append(contacto.mensajesTotales);


    divDatos.append(hora);
    divDatos.append(totalMensajes);
    divHijo.append(ultimoContacto);
    divHijo.append(mensaje);
    divContacto.append(divHijo);
    divContacto.append(divDatos);
    figure.append(img);
    figure.append(status);
    a.append(figure);
    a.append(divContacto);
    li.append(a);
    ul.append(li);

 }



}

function cargarDatosUsuario(){
   

    var datos={
        nombre:"Perico Delgado",
        trabajo:"Recursos Humanos"
    }

    var caja=$("#infoUsuario");
    var figure=$("<figure>");
    figure.addClass("mr-2 mb-0");
    var imagen=$("<img>");
    imagen.attr("src","https://via.placeholder.com/43x43");
    imagen.addClass("img-sm rounded-circle");
    var status=$("<div>");
    status.addClass("status online");

    var divUsuario=$("<div>");
    var usuario=$("<h6>");
    usuario.append(datos.nombre);
    var trabajoP=$("<p>");
    trabajoP.addClass("text-muted tx-13");
    trabajoP.append(datos.trabajo);
    divUsuario.append(usuario);
    divUsuario.append(trabajoP);
    figure.append(imagen);
    figure.append(status);
    caja.append(figure);
    caja.append(divUsuario);
}