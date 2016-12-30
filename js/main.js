function checkElementInViewport(el, margin = 0) {
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
    top >= window.pageYOffset + margin &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
};

var mainTitle = document.querySelector('.intro-animation');
var firstSectionDeer = document.querySelector('.first-section-deer');
var arrowDown = document.querySelector('.arrow-down');
var evoSide = document.querySelector('.evo-side');
var voices = document.querySelector('.lombok');

var memoMainTitleInViewport;
var memoEvoSideInViewport = false;

window.addEventListener("scroll", function() {
  arrowDown.classList.remove('fadein-with-delay');
  arrowDown.classList.add('fadeout-fast');

  var mainTitleInViewScrolling = checkElementInViewport(mainTitle, 100);

  if (mainTitleInViewScrolling !== memoMainTitleInViewport) {
    var addClass = mainTitleInViewScrolling ? 'fadein' : 'fadeout';
    var removeClass = addClass === 'fadein' ? 'fadeout' : 'fadein';
    firstSectionDeer.classList.remove(removeClass);
    firstSectionDeer.classList.add(addClass);
    memoMainTitleInViewport = mainTitleInViewScrolling;
  }

  if (!mainTitleInViewScrolling !== memoEvoSideInViewport && checkElementInViewport(voices)) {
    evoSide.classList.remove('fadeout');
    evoSide.classList.add('fadein-with-delay');
    memoEvoSideInViewport = !mainTitleInViewScrolling;
  } else if(mainTitleInViewScrolling && evoSide.classList.contains('fadein-with-delay')) {
    evoSide.classList.remove('fadein-with-delay');
    evoSide.classList.add('fadeout');
    memoEvoSideInViewport = !mainTitleInViewScrolling;
  }
});
