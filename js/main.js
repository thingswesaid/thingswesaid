var beanTitlePosition;

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

// refactor make class ? <>
function isBeanTitleOnTop(el) {
  var top = el.offsetTop;
  var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }

  if (beanTitlePosition === undefined && y >= top) {
    beanTitlePosition = y;
  }

  return y >= beanTitlePosition
}

var mainTitle = document.querySelector('.intro-animation');
var firstSectionDeer = document.querySelector('.first-section-deer');
var arrowDown = document.querySelector('.arrow-down');
var evoSide = document.querySelector('.evo-side');
var bean = document.querySelector('.bean');
var beanTitle = document.querySelector('.bean-title');
var evoPicOne = document.querySelector('.evo-pic-1');
var evoPicTwo = document.querySelector('.evo-pic-2');
var beanComponents = document.querySelector('.bean-components');

var memoMainTitle;
var memoBean;
var startingPoint;
var memoEvoPics;

// refactor make all functions <>
// refactor create anchors <>
window.addEventListener("scroll", function() {
  arrowDown.classList.remove('fadein-with-delay');
  arrowDown.classList.add('fadeout-fast');

  var mainTitleInView = checkElementInViewport(mainTitle, 100);

  if (mainTitleInView !== memoMainTitle) {
    var addClass = mainTitleInView ? 'fadein' : 'fadeout';
    var removeClass = addClass === 'fadein' ? 'fadeout' : 'fadein';
    firstSectionDeer.classList.remove(removeClass);
    firstSectionDeer.classList.add(addClass);
    memoMainTitle = mainTitleInView;
  }

  var beanInViewport = checkElementInViewport(bean);
  if (beanInViewport && beanInViewport !== memoBean) {
    evoSide.classList.remove('fadeout');
    evoSide.classList.add('fadein-with-delay');
    memoBean = true;
  } else if(memoBean !== undefined && beanInViewport !== memoBean) {
    evoSide.classList.remove('fadein-with-delay');
    evoSide.classList.add('fadeout');
    memoBean = false;
  }

  // function structure to repeat <>
  if (isBeanTitleOnTop(beanTitle) && isBeanTitleOnTop(beanTitle) !== memoEvoPics) {
    beanTitle.classList.add('sticky-bean');

    // evoPicOne.classList.remove('fadeout');
    // evoPicOne.classList.add('fadein');
    // beanComponents.classList.remove('fadeout');
    // beanComponents.classList.add('fadein-with-delay');
    // evoPicTwo.classList.remove('fadeout');
    // evoPicTwo.classList.add('fadein-with-long-delay');
    memoEvoPics = true;
  } else if(memoEvoPics !== undefined && isBeanTitleOnTop(beanTitle) !== memoEvoPics) {
    beanTitle.classList.remove('sticky-bean');

    // evoPicOne.classList.remove('fadein');
    // evoPicOne.classList.add('fadeout');
    // beanComponents.classList.remove('fadein-with-delay');
    // beanComponents.classList.add('fadeout');
    // evoPicTwo.classList.remove('fadein-with-long-delay');
    // evoPicTwo.classList.add('fadeout');
    memoEvoPics = false;
  }

  if (beanInViewport && !checkElementInViewport(bean, 300)) {
    startingPoint = startingPoint === undefined ? window.pageYOffset : startingPoint;
    var move = 50 - (window.pageYOffset - startingPoint);
    if (move <= 50) evoSide.style.right = `${move - 10}px`;
  } else if (beanInViewport) {
    evoSide.style.right = '50px';
  }
});
