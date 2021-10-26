var userPwd=getCookie("userPwd");
var profileId=getCookie("profileId");

$(function() {
    'use strict';





if(userPwd!=null&&profileId!=null){
    cargarDatosPerfil("perfil","noclick");




}
else {
    window.location.replace("https://www.s-recsolutions.com/jorge/hotel/index.html");
}



});



function comprobarContraseñaNueva(){
    var contraseña=$("#contraseñaNueva").val();
    var contraseñaActual=$("#contraseñaActual").val();
    var repetirContraseña=$("#repetirContraseña").val();
    var cajaMensaje=$("#cajaMensaje");
    var mensajeError=$("#mensajeError");
    mensajeError.remove();
    if(contraseña==""||contraseña==""){
        cajaMensaje.append("<label class='bg-danger text-white mt-2' id='mensajeError'>Error, parámetros incompletos. Vuelve a intentarlo...</label>");
    }
    else if(contraseña!=repetirContraseña){
        cajaMensaje.append("<label class='bg-danger text-white mt-2' id='mensajeError'>Error, las contraseñas no coinciden. Vuelve a intentarlo...</label>");
    }

    else {
        var datos = {
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:userPwd,
                profileID:profileId,
                pwd:contraseñaActual,
                newpwd:repetirContraseña
   };

    fetch("https://api.s-recsolutions.com/v1/users/resetpwd", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(datos)
      }).then(function(response) {

        $("#contraseñaActual").val("");
        $("#contraseñaNueva").val("");
        $("#repetirContraseña").val("");

        if(response.status==200){
            showSwal("contraseña");
        }
        else if(response.status==401){
            showSwal("contraseñaIncorrecta");
        }





      })

      .then(function(text) {





});
    }


}



function cargarDatosPerfil(seleccion,noclick=null){

    var cajaPerfil=$("#cajaPerfil");
    cajaPerfil.empty();

    if(noclick==null){
        var liActivo=$(".nav-item.active");
        liActivo.removeClass();
        liActivo.addClass("nav-item perfil mr-5");

    }


    switch(seleccion){
        case "perfil":
            cargarPerfil();
        var liActivo=$("#perfil");
        liActivo.removeClass();
        liActivo.addClass("nav-item active perfil mr-5");

        cajaPerfil.append("<div class='form-group row border-bottom mb-4'>"+
        "<label for='nombre' class='col-sm-4 col-md-3 col-form-label'>Nombre</label>"+
        "<div class='col-sm-8 col-md-7 col-xl-6'>"+
        "<input type='text' class='form-control bg-secondary' id='nombre' placeholder='Nombre'><p class='mt-2 text-right d-sm-none d-md-none d-lg-block'>Cambia el nombre de tu perfil.</p>"+
        "</div>"+
        "</div>"+
        "<div class='form-group row border-bottom my-4'>"+
        "<label for='email' class='col-sm-4 col-md-3 col-form-label'>Email</label>"+
        "<div class='col-sm-8 col-md-7 col-xl-6'>"+
        "<input type='email' class='form-control bg-secondary' id='email' placeholder='Email'><p class='mt-2 text-right d-sm-none d-md-none d-lg-block'>Cambia el email vinculado a tu cuenta.</p>"+
        "</div>"+
        "</div>"+
        "<div class='form-group row border-bottom mt-4'>"+
        "<label for='empresa' class='col-sm-4 col-md-3 col-form-label'>Empresa</label>"+
        "<div class='col-sm-8 col-md-7 col-xl-6'><input type='text' class='form-control bg-secondary' id='empresa' placeholder='Empresa'><p class='mt-2 text-right d-sm-none d-md-none d-lg-block'>Cambia el nombre de tu empresa.</p></div></div>"+
        "<div class='row bg-secondary text-right'><div class='col col-12'>"+
        "<button class='btn btn-light my-4' onclick='guardarPerfil() ' disabled id='botonGuardar'>Guardar cambios</button></div></div>");



        var nombreInput=$("#nombre");
        var emailInput=$("#email");
        var empresaInput=$("#empresa");

        var datos = { method: 'GET',
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:userPwd,
                profileID:profileId,
                id:profileId
   };


        $.get( "https://api.s-recsolutions.com/v1/users", datos )
        .done(function( datos ) {

            for(let dato of datos){
                var nombre=dato.name;
                var email=dato.email;
                var empresa=dato.brandName;
            }

            nombreInput.val(nombre);
            emailInput.val(email);
            empresaInput.val(empresa);


            $( "#nombre" ).on("input",function () {
                $("#botonGuardar").removeAttr("disabled");
                $("#botonGuardar").removeClass();
                $("#botonGuardar").addClass("btn btn-primary my-4");

              });

            $( "#email" ).on("input",function () {
                $("#botonGuardar").removeAttr("disabled");
                $("#botonGuardar").removeClass();
                $("#botonGuardar").addClass("btn btn-primary my-4");
            });

            $( "#empresa" ).on("input",function () {
                $("#botonGuardar").removeAttr("disabled");
                $("#botonGuardar").removeClass();
                $("#botonGuardar").addClass("btn btn-primary my-4");
            });
        });






            break;

        case "privacidad":
            cargarPerfil();
            var liActivo=$("#privacidad");
            liActivo.removeClass();
            liActivo.addClass("nav-item active perfil mr-5");

            cajaPerfil.append("<div class='form-group row border-bottom mb-4'>"+
        "<label for='contraseñaActual' class='col-sm-6 col-md-5 col-xl-3 col-form-label'>Contraseña actual</label>"+
        "<div class='col-sm-5 '>"+
        "<input type='password' class='form-control bg-secondary' id='contraseñaActual' placeholder='Contraseña actual'><p class='mt-2 text-right d-sm-none d-md-none d-lg-block'>Contraseña que usas actualmente para iniciar sesión.</p>"+
        "</div>"+
        "<div class='col-sm-1'><button class='btn btn-link' onclick='cargarContraseñaVisible(\"contraseñaActual\")' id='btnVisibleContraseñaActual'><span class='iconify text-primary' data-icon='feather-eye' data-inline='false' id='spanContraseñaActual'></span></button></div>"+
        "</div>"+
        "<div class='form-group row border-bottom my-4'>"+
        "<label for='contraseñaNueva' class='col-sm-6 col-md-5 col-xl-3 col-form-label'>Nueva contraseña</label>"+
        "<div class='col-sm-5'>"+
        "<input type='password' class='form-control bg-secondary' id='contraseñaNueva' placeholder='Nueva contraseña'><p class='mt-2 text-right d-sm-none d-md-none d-lg-block'>Contraseña que quieres usar a partir de ahora.</p>"+
        "</div>"+
        "<div class='col-sm-1'><button class='btn btn-link' onclick='cargarContraseñaVisible(\"nuevaContraseña\")' id='btnVisibleContraseñaNueva'><span class='iconify text-primary' data-icon='feather-eye' data-inline='false' id='spanNuevaContraseña'></span></button></div>"+
        "</div>"+
        "<div class='form-group row border-bottom mt-4'>"+
        "<label for='repetirContraseña' class='col-sm-6 col-md-5 col-xl-3 col-form-label'>Repetir nueva contraseña</label>"+
        "<div class='col-sm-5' id='cajaMensaje'><input type='password' class='form-control bg-secondary' id='repetirContraseña' placeholder='Repetir nueva contraseña'><p class='mt-2 text-right d-sm-none d-md-none d-lg-block'>Repite tu nueva contraseña.</p>"+

        "</div>"+
        "<div class='col-sm-1'><button class='btn btn-link' onclick='cargarContraseñaVisible(\"repetirContraseña\")' id='btnVisibleRepetirContraseña'><span class='iconify text-primary' data-icon='feather-eye' data-inline='false' id='spanRepetirContraseña'></span></button></div>"+
        "</div>"+
        "<div class='row bg-secondary text-right'><div class='col col-12'><button class='btn btn-light my-4' onclick='comprobarContraseñaNueva()' id='btnGuardarContraseña' >Guardar cambios</button></div></div>");


        $( "#contraseñaActual" ).on("input",function () {

            comprobarInputsContraseñas();


          });

        $( "#contraseñaNueva" ).on("input",function () {
            comprobarInputsContraseñas();
        });

        $( "#repetirContraseña" ).on("input",function () {
            comprobarInputsContraseñas();
        });

        break;



        case "imagenes":
            var cajaDatosPerfil=$("#cajaDatosPerfil");
            cajaDatosPerfil.empty();
            cargarTablaColores();
            var liActivo=$("#imagenes");
            liActivo.removeClass();
            liActivo.addClass("nav-item active perfil mr-5");

            cajaPerfil.append("<h5 class='text-center'>Logo de inicio de sesión</h5><div class='form-group row border-bottom mb-4 justify-content-center'>"+

        "<div class='col-sm-5 text-right'>"+
        "<input type='file' class='form-control border-0 text-center' id='logoInicio' ><label for='logoInicio' class='image-button'><img src='assets/images/image.svg'/> Elige una imagen</label><p class='my-2 text-right d-sm-none d-md-none d-lg-block'>Cambia la imagen de inicio de sesión.</p><button class='btn btn-primary' disabled onclick='guardarImagenNueva(&quot;logoInicio&quot;)'>Guardar</button>"+
        "</div>"+

        "</div>"+

        "<h5 class='text-center'>Imagen de cabecera</h5><div class='form-group row border-bottom mb-4 justify-content-center'>"+

        "<div class='col-sm-5 text-right'>"+
        "<input type='file' class='form-control border-0' id='logoInicial' ><label for='logoInicial' class='image-button'><img src='assets/images/image.svg'/> Elige una imagen</label><p class='my-2 text-right d-sm-none d-md-none d-lg-block'>Cambia la imagen de cabecera.</p><button class='btn btn-primary'  disabled onclick='guardarImagenNueva(&quot;logo&quot;)'>Guardar</button>"+
        "</div>"+

        "</div>"+

        "<h5 class='text-center'>Imagen de perfil</h5><div class='form-group row border-bottom mb-4 justify-content-center'>"+

        "<div class='col-sm-5 text-right'>"+
        "<input type='file' class='form-control border-0' id='logoPerfil' ><label for='logoPerfil' class='image-button'><img src='assets/images/image.svg'/> Elige una imagen</label><p class='my-2 text-right d-sm-none d-md-none d-lg-block'>Cambia la imagen de perfil.</p><button class='btn btn-primary' disabled onclick='guardarImagenNueva(&quot;logoPerfil&quot;)'>Guardar</button>"+
        "</div>");


        $("input:file").change(function (){
            var btn=$(this).parent().children('button');
            btn.removeAttr("disabled");
            btn.attr("enabled","enabled");
            var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
            var label=$(this).parent().children('label');
            label.text(fileName);

        });






        break;

        default:
            alert("Algo ha ido mal");
    }


}


function guardarPerfil(){
    var nombreInput=$("#nombre").val();
    var emailInput=$("#email").val();
    var empresaInput=$("#empresa").val();


    var datos = { method: 'GET',
                apiKey:"02d5214506fa468484e962868800395f",
                userPwd:userPwd,
                name:nombreInput,
                mail:emailInput,
                brand:empresaInput
   };

    fetch("https://api.s-recsolutions.com/v1/users/register", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(datos)
      }).then(function(response) {



        return response.text();





      })

      .then(function(text) {

        $("#botonGuardar").attr("disabled","disabled");
        $("#botonGuardar").removeClass();
        $("#botonGuardar").addClass("btn btn-secondary my-4");
        showSwal("confirmacionEdicion");
        var nombreDato=$("#nombreDato");
        var emailDato=$("#emailDato");
        var empresaDato=$("#empresaDato");
        nombreDato.text(nombreInput);
        emailDato.text(emailInput);
        empresaDato.text(empresaInput);



});

}


function comprobarInputsContraseñas(){
    var contraseñaActual=$("#contraseñaActual").val();
    var contraseñaNueva=$("#contraseñaNueva").val();
    var repetirContraseña=$("#repetirContraseña").val();

        if(contraseñaActual!=""&&contraseñaNueva!=""&&repetirContraseña!=""){
            $("#btnGuardarContraseña").removeAttr("disabled");
            $("#btnGuardarContraseña").removeClass();
            $("#btnGuardarContraseña").addClass("btn btn-primary my-4");
        }
        else {
            $("#btnGuardarContraseña").attr("disabled","disabled");
            $("#btnGuardarContraseña").removeClass();
            $("#btnGuardarContraseña").addClass("btn btn-light my-4");
        }
}


function cargarContraseñaVisible(boton){

    if(boton=="contraseñaActual"){
        var span=$("#spanContraseñaActual");
        var btnContraseña=$("#btnVisibleContraseñaActual");
        var inputContraseña=$("#contraseñaActual");


        if(span.attr("data-icon")=="feather-eye"){
            btnContraseña.empty();
            btnContraseña.append("<span class='iconify text-primary' data-icon='feather-eye-off' data-inline='false' id='spanContraseñaActual'></span>");
            inputContraseña.removeAttr("type");
            inputContraseña.attr("type","text");
        }
        else {
            btnContraseña.empty();
            btnContraseña.append("<span class='iconify text-primary' data-icon='feather-eye' data-inline='false' id='spanContraseñaActual'></span>");
            inputContraseña.removeAttr("type");
            inputContraseña.attr("type","password");
        }
    }

    else if(boton=="nuevaContraseña"){
        var span=$("#spanNuevaContraseña");
        var btnContraseña=$("#btnVisibleContraseñaNueva");
        var inputContraseña=$("#contraseñaNueva");

        if(span.attr("data-icon")=="feather-eye"){
            btnContraseña.empty();
            btnContraseña.append("<span class='iconify text-primary' data-icon='feather-eye-off' data-inline='false' id='spanNuevaContraseña'></span>");
            inputContraseña.removeAttr("type");
            inputContraseña.attr("type","text");
        }
        else {
            btnContraseña.empty();
            btnContraseña.append("<span class='iconify text-primary' data-icon='feather-eye' data-inline='false' id='spanNuevaContraseña'></span>");
            inputContraseña.removeAttr("type");
            inputContraseña.attr("type","password");
        }
    }

    else if(boton=="repetirContraseña"){
        var span=$("#spanRepetirContraseña");
        var btnContraseña=$("#btnVisibleRepetirContraseña");
        var inputContraseña=$("#repetirContraseña");

        if(span.attr("data-icon")=="feather-eye"){
            btnContraseña.empty();
            btnContraseña.append("<span class='iconify text-primary' data-icon='feather-eye-off' data-inline='false' id='spanRepetirContraseña'></span>");
            inputContraseña.removeAttr("type");
            inputContraseña.attr("type","text");
        }
        else {
            btnContraseña.empty();
            btnContraseña.append("<span class='iconify text-primary' data-icon='feather-eye' data-inline='false' id='spanRepetirContraseña'></span>");
            inputContraseña.removeAttr("type");
            inputContraseña.attr("type","password");
        }
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }




function guardarImagenNueva(imagen){


    switch(imagen){

        case "logoInicio":
            var input = document.getElementById("logoInicio");
            file = input.files[0];
            if(input.files.length != 0){
                var formData = new FormData();
                formData.append('image', file);
                formData.append('imagen', "logoInicio");

                fetch('assets/php/imagenes.php',
                {
                     method: 'POST',
                    body: formData
                    }
        ).then(function(data){

           return data.text();

        }).then(function(text){
           showSwal("logoInicio");
           input.type = "text";
            input.type = "file";
            var label=$(this).parent().children('label');
            console.log(label);
           label.text("Elige una imagen");
        });
            }

            else {
                showSwal("imagenNoSeleccionada");
            }






        break;




        case "logoPerfil":
            var input = document.getElementById("logoPerfil");
            file = input.files[0];
            if(input.files.length != 0){
                var formData = new FormData();
            formData.append('image', file);
            formData.append('imagen', "logoPerfil");

            fetch('assets/php/imagenes.php',
            {
                 method: 'POST',
                body: formData
                }
    ).then(function(data){

       return data.text();

    }).then(function(text){
        showSwal("logoPerfil");
        input.type = "text";
        input.type = "file";
    });
            }

            else {
                showSwal("imagenNoSeleccionada");
            }

        break;



        case "logo":
            var input = document.getElementById("logoInicial");
            file = input.files[0];

            if(input.files.length != 0){
                var formData = new FormData();
            formData.append('image', file);
            formData.append('imagen', "logo");

            fetch('assets/php/imagenes.php',
            {
                 method: 'POST',
                body: formData
                }
    ).then(function(data){

       return data.text();

    }).then(function(text){
        showSwal("logo");
        input.type = "text";
        input.type = "file";
    });
            }

            else {
                showSwal("imagenNoSeleccionada");
            }


        break;

        default:
            alert("Error");
    }
}


