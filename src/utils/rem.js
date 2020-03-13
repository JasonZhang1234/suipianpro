function setRem (){
    var whef = 100/1280;
    var wW = window.innerWidth;
    var rem = wW * whef;
    document.querySelector("html").style.fontSize = rem+"px";
}
setRem();
window.onresize = function(){
    setRem();
}

