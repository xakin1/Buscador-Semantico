

function logout(){
    deleteCookie("userPwd");
    deleteCookie("profileId");
    // window.location.replace("https://www.s-recsolutions.com/dashboard/amaquia/index.html");
  }



  function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

