console.log("hello");

var input=document.getElementsByTagName("input")[0];
input.addEventListener('input', function() {
    if (input.value.length > 0) {
        input.classList.add('no-border');
    } else {
        input.classList.remove('no-border');
    }});