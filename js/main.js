function checkElementInViewport(el) {
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
    top >= window.pageYOffset + 100 &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
};

var thingswesaidTitle = document.querySelector('.intro-animation');
var firstSectionDeer = document.querySelector('.first-section-deer');
var arrowDown = document.querySelector('.arrow-down');

var isElementInViewport;
var memoizeElementInViewport = isElementInViewport;

window.addEventListener("scroll", function() {
  arrowDown.classList.remove('fadein-with-delay');
  arrowDown.classList.add('fadeout-fast');

  var isInViewAfterScrolling = checkElementInViewport(thingswesaidTitle);
  if (isInViewAfterScrolling !== memoizeElementInViewport) {
    var addClass = isInViewAfterScrolling ? 'fadein' : 'fadeout';
    var removeClass = addClass === 'fadein' ? 'fadeout' : 'fadein';
    firstSectionDeer.classList.remove(removeClass);
    firstSectionDeer.classList.add(addClass);
    memoizeElementInViewport = isInViewAfterScrolling;
  }
});
