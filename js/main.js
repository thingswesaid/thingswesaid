function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
};

var thingswesaidTitle = document.querySelector('.intro-animation');
  window.addEventListener("scroll", function() {
    console.log(thingswesaidTitle)
    console.log(elementInViewport(thingswesaidTitle));
    if (elementInViewport(thingswesaidTitle)) {
      var a = document.querySelector('.first-section-deer');
      console.log(a);
    }
  });
