

var colorPrimario=localStorage.getItem("colorPrimario");
var colorSecundario=localStorage.getItem("colorSecundario");

if(colorPrimario==null){
    localStorage.setItem("colorPrimario","#5a1e0f");
}

if(colorSecundario==null){
    localStorage.setItem("colorSecundario","#F1CCB2");
}

    $(function() {
        'use strict';
    
        
    
    
    document.documentElement.style.setProperty('--secondary',colorSecundario);
    document.documentElement.style.setProperty('--primary',colorPrimario);

    let myCss = $('#myStyles');
    
    document.getElementById('myStyles').innerHTML = myCss;
        
    
    
    
    
    
    });