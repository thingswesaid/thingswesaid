// HTML elements && window
docWidth = window.innerWidth;
docHeight = window.innerHeight;
docHeightHalf = docHeight / 2;

var firstSection = document.querySelector('#first-section');
var specsSection = document.querySelector('#specs-section');
var thingswesaidBullet = document.querySelector('#thingswesaid');
var beanBullet = document.querySelector('#bean');
var emailBullet = document.querySelector('#email');
var creditBullet = document.querySelector('#credit');
var emailSection = document.querySelector('#email-section');
var creditsSection = document.querySelector('#credits-section');
var beanPicsBullet = document.querySelector('#bean-pics');
var beanSpecsBullet = document.querySelector('#bean-specs');
var creditsSection = document.querySelector('#credits-section');
var mainTitle = document.querySelector('.main-title');
var beanTitle = document.querySelector('.bean-title');
var evoSide = document.querySelector('.evo-side');
var firstSectionDeer = document.querySelector('.first-section-deer');
var arrowDown = document.querySelector('.arrow-down');
var evoPicOne = document.querySelector('.evo-pic-1');
var evoPicTwo = document.querySelector('.evo-pic-2');
var beanComponents = document.querySelector('.bean-components');
var beanSpecs = document.querySelector('.bean-specs');
var sylo = document.querySelector('.sylo');
var specs = document.querySelector('.specs');
var emailSectionContent = document.querySelector('.email-section-content');
var beanSection = document.querySelector('#bean-section');


// memos
var memoArrow;
var memoFirstSectionInView;
var beanTitlePositionStick;
var memoSecondSectionInView = false;
var startingPoint;
var memoBeanTitleSticking = false;
var memoBeanPics = false;
var memoEmailSectionInView;
var memoCreditsSectionInView;

// helper functions
function checkElementInViewport(el, marginTop = 0, marginBottom = 0) {
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
    (top + marginTop) >= window.pageYOffset &&
    left >= window.pageXOffset &&
    ((top + marginBottom) + height) <= (window.pageYOffset + window.innerHeight) &&
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

beanSection.style.height = `${docHeight * 3.5}px`;
specsSection.style.bottom = `${docHeight * 1.5}px`;
emailSection.style.bottom = `${docHeight / 1.3}px`;
creditsSection.style.bottom = `${docHeight / 2.1}px`;
thingswesaidBullet.classList.add('active');
beanTitle.style.marginTop = `${docHeight * 0.5}px`;

var toggleArrow = function(present) {
  var removeClass = present ? 'fadein-with-delay' : 'fadeout-fast';
  var addClass = present ? 'fadeout-fast' : 'fadein-with-delay';
  arrowDown.classList.remove(removeClass);
  arrowDown.classList.add(addClass);
  memoArrow = !present;
};

var switchNavigator = function(el, active) {
  var switchToClass = active ? 'active' : '';
  el.classList = switchToClass;
}

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
    switchNavigator(beanPicsBullet, true);
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
    switchNavigator(beanPicsBullet, false);
  }
}

var showBeanSpecs = function(show) {
  if (show) {
    sylo.classList.remove('fadeout');
    sylo.classList.add('fadein');
    specs.classList.remove('fadeout');
    specs.style.animationDelay = '.2s'
    specs.classList.add('fadein');
    showBeanPics(false);
    if (memoEmailSectionInView) showEmailSection(false);
    switchNavigator(beanPicsBullet, false);
    switchNavigator(beanSpecsBullet, true);
  } else if (!show && memoBeanTitleSticking) {
    sylo.classList.remove('fadein');
    sylo.classList.add('fadeout');
    specs.classList.remove('fadein');
    specs.style.animationDelay = ''
    specs.classList.add('fadeout');
    switchNavigator(beanPicsBullet, true);
    switchNavigator(beanSpecsBullet, false);
  }
}

var stickBeanTitleCheck = function(timeToStick) {
  if (!memoBeanTitleSticking && timeToStick[0]) {
    beanTitle.style.marginTop = '0';
    beanTitle.classList.add('sticky-bean');
    beanTitlePositionStick = timeToStick[1]
    memoBeanTitleSticking = true;
    showBeanPics(true);
    switchNavigator(beanPicsBullet, true);
  } else if(beanTitlePositionStick && beanTitlePositionStick >= document.body.scrollTop) {
    beanTitle.classList.remove('sticky-bean');
    beanTitle.style.marginTop = `${docHeight * 0.5}px`;
    beanTitlePositionStick = undefined;
    memoBeanTitleSticking = false;
    showBeanPics(false);
    switchNavigator(beanPicsBullet, false);
    switchNavigator(beanEmailBullet, false);
  }
};

var showEmailSection = function(show) {
  if (show) {
    emailSectionContent.classList.remove('fadeout');
    emailSectionContent.classList.add('fadein');
    showBeanSpecs(false);
    showBeanPics(false);
    switchNavigator(creditBullet, false);
    switchNavigator(beanSpecsBullet, false);
    switchNavigator(emailBullet, true);
  } else {
    emailSectionContent.classList.remove('fadein');
    emailSectionContent.classList.add('fadeout');
    switchNavigator(emailBullet, false);
  }
}

// scroll events
window.addEventListener("scroll", function() {
  if (memoArrow) toggleArrow(arrowDown)

  var firstSectionInView = checkElementInViewport(mainTitle, docHeightHalf);
  if (firstSectionInView !== memoFirstSectionInView) {
    toggleSection(firstSectionDeer, firstSectionInView, 'fadein', 'fadeout');
    memoFirstSectionInView = firstSectionInView;
    switchNavigator(thingswesaidBullet, memoFirstSectionInView)
  }

  var beanTitleInView = checkElementInViewport(beanTitle)
  if (beanTitleInView !== memoSecondSectionInView) {
    toggleSection(evoSide, beanTitleInView, 'fadein-with-delay', 'fadeout');
    memoSecondSectionInView = beanTitleInView;
    switchNavigator(beanBullet, memoSecondSectionInView);
  }

  if (beanTitleInView) slideEvoSide();
  var beanTitleInView = isBeanTitleOnTop(beanTitle);
  stickBeanTitleCheck(beanTitleInView);

  var specsSectionInView = checkElementInViewport(specsSection);
  var emailSectionInView = checkElementInViewport(emailSection, 0, -200);
  if (!memoBeanPics) showBeanSpecs(specsSectionInView && !emailSectionInView);

  var creditsSectionInView = checkElementInViewport(creditsSection, 0, -100)
  memoCreditsSectionInView = creditsSectionInView;
  if (memoBeanTitleSticking) showBeanPics(!emailSectionInView && !specsSectionInView && memoBeanTitleSticking && !creditsSectionInView)

  if (emailSectionInView && !creditsSectionInView) {
    showEmailSection(true);
    if (beanTitle.classList.contains('fadeout')) {
      beanTitle.classList.remove('fadeout');
      beanTitle.classList.add('fadein');
    }
  } else if (emailSectionInView && creditsSectionInView) {
    showEmailSection(false);
    switchNavigator(emailBullet, false);
    switchNavigator(creditBullet, true);
    beanTitle.classList.remove('fadein');
    beanTitle.classList.add('fadeout');
  }

  memoEmailSectionInView = emailSectionInView;
});
