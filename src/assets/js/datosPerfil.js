
var userPwd=localStorage.getItem("userPwd");
var profileId=localStorage.getItem("profileId");

$(function() {
    'use strict';








cargarPerfil();


});



function cargarPerfil(){
    var datos = {
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:"69637182",
                profileID:"1268900770",
                id:profileId
   };


    $.get( "https://pre.s-recsolutions.com/v1/users", datos )
    .done(function( datos ) {

var cajaDatosPerfil=$("#cajaDatosPerfil");
cajaDatosPerfil.empty();
$("#tituloPerfil").text("Tu perfil");
cajaDatosPerfil.append("<div class='text-center'>"+
"<img src='assets/images/logoPerfil.png' alt=''>"+
"</div>"+

"<div class='row text-center mt-5 border-top border-bottom bg-secondary border-dark'>"+
"<div class='col col-4 my-3 border-right border-dark'>"+
"<h6>Nombre</h6>"+
"</div>"+
"<div class='col col-4  my-3 border-right border-dark'>"+
"<h6>Email</h6>"+
"</div>"+
"<div class='col col-4  my-3 '>"+
"<h6>Empresa</h6>"+
"</div>"+

"</div>"+


"<div class='row text-center pt-3'>"+
"<div class='col col-4 border-right'>"+
"<h5 id='nombreDato'></h5>"+
"</div>"+
"<div class='col col-4  border-right'>"+
"<h5 id='emailDato'></h5>"+
"</div>"+
"<div class='col col-4'>"+
"<h5 id='empresaDato'></h5>"+
"</div>"+

"</div>");




        for(let dato of datos){
            var nombre=dato.name;
            var email=dato.email;
            var empresa=dato.brandName;
        }


        var cajaUsuario=$("#infoUsuario");
        cajaUsuario.empty();
        var nombreDato=$("#nombreDato");
        var emailDato=$("#emailDato");
        var empresaDato=$("#empresaDato");

        var nombreInput=$("#nombre");
        var emailInput=$("#email");
        var empresaInput=$("#empresa");

        nombreInput.val(nombre);
        emailInput.val(email);
        empresaInput.val(empresa);

        nombreDato.text(nombre);
        emailDato.text(email);
        empresaDato.text(empresa);



        cajaUsuario.append("<p class='name font-weight-bold mb-0'>"+nombre+"</p>");


        cajaUsuario.append("<p class='email text-muted mb-3'>"+email+"</p>");


    });
}


function cargarTablaColores(){

    var cajaDatosPerfil=$("#cajaDatosPerfil");
    cajaDatosPerfil.append("<div class='row text-center'><div class='col col-12'><button id='trigger' disabled class='btn btn-dark text-white' >Paleta de colores</button></div></div>"+
    "<h6 class='mt-5 mx-3'>Selecciona el color que deseas cambiar y abre la paleta para seleccionar un nuevo color.</h6>"+
    "<div class='form-check mt-5 mx-4'>"+
    "<input class='form-check-input' type='radio' name='exampleRadios' id='radioPrimario' value='colorPrimario'>"+
    "<label class='form-check-label' for='radioPrimario'>"+
      "Color principal"+
    "</label>"+
  "</div>"+
  "<div class='form-check mt-3 mx-4'>"+
    "<input class='form-check-input' type='radio' name='exampleRadios' id='radioSecundario' value='colorSecundario'>"+
    "<label class='form-check-label' for='radioSecundario'>"+
      "Color secundario"+
    "</label>"+
  "</div>"+
  "<h6 class='mt-5 mx-3'>Elige el color que más te guste, pero recuerda que ciertos colores pueden provocar que algunos elementos de la web no sean visibles...</h6>"



    );
    $("#tituloPerfil").text("Estilo de página");
    const button = document.getElementById('trigger');
    var primario=$("#radioPrimario");
    var secundario=$("#radioSecundario");
    let picker = new ColorPicker(button, colorPrimario);

    primario.click(function(){
        $("#trigger").removeAttr("disabled");
        $("#trigger").attr("enabled","enabled");
        var colorPrimario=localStorage.getItem("colorPrimario");
        let picker = new ColorPicker(button, colorPrimario);

        button.addEventListener('colorChange', function (event) {
            if(primario.is(':checked')){
                const color = event.detail.color;

                localStorage.setItem("colorPrimario",color.hex);
            }


          });


    });


    secundario.click(function(){
        $("#trigger").removeAttr("disabled");
        $("#trigger").attr("enabled","enabled");
        var colorSecundario=localStorage.getItem("colorSecundario");
        let picker = new ColorPicker(button, colorSecundario);

        button.addEventListener('colorChange', function (event) {
            if(secundario.is(':checked')){
            const color = event.detail.color;
            localStorage.setItem("colorSecundario",color.hex);
            }
          });


    });




}



function cargarCajaPerfil(){

}
