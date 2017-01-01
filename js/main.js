// HTML elements && window
docWidth = window.innerWidth;
docHeight = window.innerHeight;
docHeightHalf = docHeight / 2;

var firstSection = document.querySelector('#first-section');
var thirdSection = document.querySelector('#third-section');
var beanTitle = document.querySelector('.bean-title');
var evoSide = document.querySelector('.evo-side');
var firstSectionDeer = document.querySelector('.first-section-deer');
var arrowDown = document.querySelector('.arrow-down');
var evoPicOne = document.querySelector('.evo-pic-1');
var evoPicTwo = document.querySelector('.evo-pic-2');
var beanComponents = document.querySelector('.bean-components');
var beanSpecs = document.querySelector('.bean-specs');

// memos
var memoArrow;
var memoFirstSectionInView = false;
var beanTitlePositionStick;
var memoSecondSectionInView = false;
var startingPoint;
var memoBeanTitleSticking = false;
var memoBeanPics = false;

// helper functions
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
    top >= window.pageYOffset - margin &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
};

function isBeanTitleOnTop(el, margin = 0) {
  var top = el.offsetTop;
  var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }

  var greater = y + margin >= top;
  if (greater) return [true, y];
  return false;
};

// lifecycle functions
window.onbeforeunload = function() {
  window.scrollTo(0,0);
};

var toggleArrow = function(present) {
  var removeClass = present ? 'fadein-with-delay' : 'fadeout-fast';
  var addClass = present ? 'fadeout-fast' : 'fadein-with-delay';
  arrowDown.classList.remove(removeClass);
  arrowDown.classList.add(addClass);
  memoArrow = !present;
};

var toggleSection = function(el, present, classIn, classOut) {
  var addClass = present ? classIn : classOut;
  var removeClass = present ? classOut : classIn;
  el.classList.remove(removeClass);
  el.classList.add(addClass);
};

toggleArrow(memoArrow);

slideEvoSide = function() {
  if (isBeanTitleOnTop(beanTitle, docHeight / 4)[0]) {
    startingPoint = startingPoint === undefined ? window.pageYOffset : startingPoint;
    var move = 50 - (window.pageYOffset - startingPoint);
    if (move <= 50) evoSide.style.right = `${move - 10}px`;
  }
};

beanTitle.style.marginTop = `${docHeight * 0.5}px`;

var showBeanPics = function(show) {
  if (show) {
    evoPicOne.classList.remove('fadeout');
    evoPicOne.classList.add('fadein');
    beanComponents.classList.remove('fadeout');
    beanComponents.style.animationDelay = '.4s'
    beanComponents.classList.add('fadein');
    evoPicTwo.classList.remove('fadeout');
    evoPicTwo.style.animationDelay = '.8s'
    evoPicTwo.classList.add('fadein');
    memoBeanPics = true;
  } else {
    evoPicOne.classList.remove('fadein');
    evoPicOne.classList.add('fadeout');
    beanComponents.classList.remove('fadein');
    beanComponents.style.animationDelay = ''
    beanComponents.classList.add('fadeout');
    evoPicTwo.classList.remove('fadein');
    evoPicTwo.style.animationDelay = ''
    evoPicTwo.classList.add('fadeout');
    memoBeanPics = false;
  }
}

var showBeanSpecs = function(show) {
  if (show) {
    beanSpecs.classList.remove('fadeout');
    beanSpecs.classList.add('fadein');
    showBeanPics(false);
  } else if (!show && memoBeanTitleSticking && !memoBeanPics) {
    beanSpecs.classList.remove('fadein');
    beanSpecs.classList.add('fadeout');
    showBeanPics(true);
  }
}

var stickBeanTitleCheck = function(timeToStick) {
  if (!memoBeanTitleSticking && timeToStick[0]) {
    beanTitle.style.marginTop = '0';
    beanTitle.classList.add('sticky-bean');
    beanTitlePositionStick = timeToStick[1]
    memoBeanTitleSticking = true;
    showBeanPics(true);
  } else if(beanTitlePositionStick && beanTitlePositionStick >= document.body.scrollTop) {
    beanTitle.classList.remove('sticky-bean');
    beanTitle.style.marginTop = `${docHeight * 0.5}px`;
    beanTitlePositionStick = undefined;
    memoBeanTitleSticking = false;
    showBeanPics(false);
  }
};

// scroll events
window.addEventListener("scroll", function() {
  if (memoArrow) toggleArrow(arrowDown)

  var firstSectionInView = checkElementInViewport(firstSection, docHeightHalf)
  if (firstSectionInView !== memoFirstSectionInView) {
    toggleSection(firstSectionDeer, firstSectionInView, 'fadein', 'fadeout');
    memoFirstSectionInView = firstSectionInView;
  }

  var beanTitleInView = checkElementInViewport(beanTitle)
  if (beanTitleInView !== memoSecondSectionInView) {
    toggleSection(evoSide, beanTitleInView, 'fadein-with-delay', 'fadeout');
    memoSecondSectionInView = beanTitleInView;
  }

  if (beanTitleInView) slideEvoSide();
  var beanTitleInView = isBeanTitleOnTop(beanTitle);
  stickBeanTitleCheck(beanTitleInView);

  var thirdSectionInView = checkElementInViewport(thirdSection);
  showBeanSpecs(thirdSectionInView);
});
