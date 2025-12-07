//https://codepen.io/narrowdesign/pen/JNVyJbm

$(function () {
  var WIN = $(window);
  var sections = $(".js-section:visible");
  var spiral = $(".js-spiral");

  var firefox_error = document.getElementById("firefox-error");
    var spiral_hide = document.getElementById("spiral");
var citation_wrapper = document.getElementById("citation-wrapper");

  var _winW;
  var _winH;
  var smallScreen;
  var landscape;
  var aspect = 0.618033;
  var axis = 0.7237;
  var spiralOrigin;

  var rotation = 0;
  var sectionCount = sections.length;

  var currentSection = 0;
  var moved = 0;
  var animRAF;
  // var animating = false;
  var scrollTimeout;

  cancelAnimationFrame(animRAF);
  animateScroll((sectionCount - 1) * -90, rotation);
 checkForCitations(sections[sectionCount - 1].getAttribute('data-cite'));

  startScrollTimeout(); 

  var userAgent = window.navigator.userAgent.toLowerCase(),
    firefox =
      userAgent.indexOf("firefox") != -1 || userAgent.indexOf("mozilla") == -1,
    ios = /iphone|ipod|ipad/.test(userAgent),
    safari =
      (userAgent.indexOf("safari") != -1 &&
        userAgent.indexOf("chrome") == -1) ||
      ios,
    linux = userAgent.indexOf("linux") != -1,
    windows = userAgent.indexOf("windows") != -1;


if(firefox){
firefox_error.style.display = "block";
spiral_hide.style.display = "none";
citation_wrapper.style.display = "none";
}

  resizeHandler();



  // EVENTS
  /////////

  WIN.on("resize", resizeHandler);

  WIN.on("keydown", function (e) {

    //Tracks if the page is going one up or one down
var onePlus = 0;

    if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
      onePlus = 1;

    } else if (e.keyCode === 37 || e.keyCode === 38) {
      onePlus = -1;
    }

    cancelAnimationFrame(animRAF);
    animateScroll((currentSection + onePlus) * -90, rotation);
    
     if(currentSection+onePlus >= 0 && currentSection+onePlus < sectionCount){
      checkForCitations(sections[currentSection + onePlus].getAttribute('data-cite'));
     } else {
      hideCitation();
     }
    scrollHandler();

  });

  sections.on("click", function () {
    cancelAnimationFrame(animRAF);
    animateScroll($(this).index() * -90, rotation);
    checkForCitations(sections[$(this).index()].getAttribute('data-cite'));
  });

  // FUNCTIONS
  ////////////
  function scrollHandler() {


    requestAnimationFrame(function () {
      var scale = Math.pow(aspect, rotation / 90);
      currentSection = Math.min(
        sectionCount + 2,
        Math.max(-sectionCount, Math.floor((rotation - 30) / -90))
      );
      spiral.css({
        transform: "rotate(" + rotation + "deg) scale(" + scale + ")"
      });
      sections.removeClass("active");
      sections.eq(currentSection).addClass("active");
    });
 

  }

  function animateScroll(targR, startR, speed) {
    var distance = startR - targR;
    var mySpeed = speed || 0.2;
    if (
      ((targR || Math.abs(targR) === 0) && Math.abs(targR - rotation) > 0.1) ||
      Math.abs(moved) > 1
    ) {
      if (targR || Math.abs(targR) === 0) {
        rotation += mySpeed * (targR - rotation);
      } else {
        moved *= 0.98;
        rotation += moved / -10;
      }
      rotation = trimRotation();
      scrollHandler();
      animRAF = requestAnimationFrame(function () {
        animateScroll(targR, startR, speed);
      });
    } else if (targR || Math.abs(targR) === 0) {
      cancelAnimationFrame(animRAF);
      rotation = targR;
      rotation = trimRotation();
      scrollHandler();
    }
  }

  function buildSpiral() {

    // rotate around this point
    spiralOrigin =
      Math.floor(_winW * axis) +
      "px " +
      Math.floor(_winW * aspect * axis) +
      "px";
    var w = _winW * aspect;
    var h = w; // they're squares
    if (smallScreen && !landscape) {
      // flip it 90deg if it's a portrait phone
      spiralOrigin =
        Math.floor((_winW / aspect) * aspect * (1 - axis)) +
        "px " +
        Math.floor((_winW / aspect) * axis) +
        "px ";
      w = _winW;
      h = _winW;
    }

    spiral.css({
      transformOrigin: spiralOrigin,
      // backfaceVisiblity: "hidden"
    });
    sections.each(function (i) {
      var myRot = Math.floor(90 * i);
      var scale = Math.pow(aspect, i);
      $(this).css({
        width: w,
        height: h,
        transformOrigin: spiralOrigin,
        // backfaceVisiblity: "hidden",

        transform:
          "rotate(" +
          myRot +
          "deg) scale(" +
          scale +
          ") translate3d(0,0,0)"
      });
    });
    scrollHandler();

    
  }

  function resizeHandler() {
    // Set the size of images and preload them
    _winW = window.innerWidth / (1000 / window.innerHeight);
    _winH = window.innerHeight;
    smallScreen = _winW < 960;
    landscape = _winH < _winW;
    buildSpiral();
  }

  // keep it from getting too small or too big
  function trimRotation() {
    return Math.max(-3000, Math.min(1200, rotation));

  }

  // if no scrolling happens for 200ms, animate to the closest section
  function startScrollTimeout() {
    clearTimeout(scrollTimeout);
    if (currentSection > -1 && currentSection < sectionCount) {
      scrollTimeout = setTimeout(function () {
        cancelAnimationFrame(animRAF);
        animateScroll(currentSection * -90, rotation, 0.15);
      }, 400);
    }
  }
});

