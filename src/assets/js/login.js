
$(document).on('keypress',function(e) {
  if(e.which == 13) {
      login();
  }
});

$(function() {
  'use strict'

  var userPwd=getCookie("userPwd");
  var profileId=getCookie("profileId");

});


function login(){

  var usuario=$("#usuario").val();
  var contraseña=$("#contrasena").val();

  var datos={
  'apiKey':'02d5214506fa468484e962868800395f',
  'email':''+usuario+'',
  'pwd':''+contraseña+''
  }






      // fetch("https://api.s-recsolutions.com/v1/users/login", {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Accept': 'text/plain',
      //     'Content-Type': 'text/plain'
      //   },
      //   body: JSON.stringify(datos)
      // }).then(function(response) {

      //   return response.text();



      // }).then(function(text) {
      //   var userPwd=text.split("\n")[0].trim();

      //   var profileId=text.split("\n")[1].trim();

      //   setCookie("userPwd",userPwd);
      //   setCookie("profileId",profileId);

      //   // window.location.replace("https://www.s-recsolutions.com/dashboard/amaquia/principal.html");
      // }).catch(function(text){

      //   var error=$("#errorAcceso");

      //  if(error!=null){
      //    error.empty();
      //  }


      //   var col=$("<div class='col-12'>")
      //   var label=$("<label class='bg-danger text-white p-1'>");
      //   label.append("Usuario o contraseña incorrectos. Vuelve a intentarlo.");
      //   col.append(label);
      //   error.append(col);





      // });

      // }


      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }


      function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
