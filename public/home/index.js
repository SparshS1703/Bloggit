console.log("hello");
window.addEventListener('scroll', function() {
    var header = document.getElementsByClassName("header");
    if (window.scrollY > 0) {
        header[0].classList.add("scrolled");
        document.getElementsByClassName("bg")[0].classList.add("scrolled");
    } else {
        header[0].classList.remove("scrolled");
        document.getElementsByClassName("bg")[0].classList.remove("scrolled");
    }
});
var clicked=false;
document.getElementsByClassName("bg")[0].onclick=function(){
    document.getElementsByClassName("bg")[0].classList.add("clicked");
    clicked=true;
    setTimeout(function(){
        document.getElementsByClassName("bg")[0].classList.remove("clicked");
    },400);
}

