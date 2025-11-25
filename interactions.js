(function(){
// document.getElementsByClassName("content")[0].classList.toggle("initial_hide");
}) ();

var contentDivs = document.getElementsByClassName("content");
var currentContentDiv = 0;

contentDivs[currentContentDiv].style.display = "flex";

document.onmousedown = function (e) {
    contentDivs[currentContentDiv].style.opacity = "0";
    window.setTimeout(function () {
    // do stuff after animation has finished here
        contentDivs[currentContentDiv].style.display = "none";
    currentContentDiv++;
    contentDivs[currentContentDiv].style.display = "flex";

}, 1500);
};

