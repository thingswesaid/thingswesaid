// HTML elements && window
var docHeight = window.innerHeight;
var docHeightHalf = docHeight / 2;

var pswSection = document.querySelector('#password');
var pswSectionInput = document.querySelector('#password input');

var twsTitleSection = document.querySelector('#tws-title-section');
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
var beanTitle = document.querySelector('.bean-title');
var evoSide = document.querySelector('.evo-side');
var twsSectionDeer = document.querySelector('.tws-section-deer');
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
var memoPswSection = true;
var memoTwsTitleSectionInView = true;
var beanTitlePositionStick;
var memoBeanTitleInView = false;
var startingPoint;
var memoBeanTitleSticking = false;
var memoBeanPics = false;
var memoEmailSectionInView;
var memoCreditsSectionInView;
var memoBeanTitleOnTop = false;
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

function isBeanTitleOnTop(el, scrollTop, margin = 0) {
  var top = el.offsetTop;
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }

  var greater = scrollTop + margin >= top;
  if (greater) return [true, scrollTop];
  return false;
};

var tempPsws = ['mnldcrst', 'gianniteruzzi', 'raghubala'];

// lifecycle functions
window.onbeforeunload = function() {
  window.scrollTo(0,0);
};

if (memoPswSection) {
  document.querySelector('html').style.overflow = 'hidden';
  document.querySelector('.main').style.display = 'none'
}

pswSectionInput.addEventListener('keypress', function(e) {
  var key = e.which || e.keyCode;
   if (key === 13) {
     if (tempPsws.includes(e.target.value)) {
       pswSection.classList.add('fadeout');
       document.querySelector('html').style.overflow = '';
       pswSection.style.display = 'none';
       document.querySelector('.main').style.display = ''
     }
   }
})

specsSection.style.bottom = `${docHeight * 1.5}px`;
emailSection.style.bottom = `${docHeight / 1.3}px`;
creditsSection.style.bottom = `${docHeight / 2.1}px`;

thingswesaidBullet.classList.add('active');

var toggleArrow = function(present) {
  var removeClass = present ? 'fadein-with-delay' : 'fadeout-fast';
  var addClass = present ? 'fadeout-fast' : 'fadein-with-delay';
  arrowDown.classList.remove(removeClass);
  arrowDown.classList.add(addClass);
  memoArrow = !present;
};

var switchNavigator = function(el, active, el2 = null, el3 = null) {
  var switchToClass = active ? 'active' : '';
  el.classList = switchToClass;
  if (el2) el2.classList = '';
  if (el3) el3.classList = '';
}

var toggleSection = function(el, present, classIn, classOut) {
  var addClass = present ? classIn : classOut;
  var removeClass = present ? classOut : classIn;
  el.classList.remove(removeClass);
  el.classList.add(addClass);
};

toggleArrow(memoArrow);

slideEvoSide = function(scrollTop) {
  if (isBeanTitleOnTop(beanTitle, scrollTop, docHeight / 4)[0]) {
    startingPoint = startingPoint === undefined ? window.pageYOffset : startingPoint;
    var move = (window.pageYOffset - startingPoint);
    if (move <= 300) evoSide.style.right = `-${move}px`;
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
    switchNavigator(beanSpecsBullet, true, beanPicsBullet);
  } else if (!show && memoBeanTitleSticking) {
    sylo.classList.remove('fadein');
    sylo.classList.add('fadeout');
    specs.classList.remove('fadein');
    specs.style.animationDelay = ''
    specs.classList.add('fadeout');
    switchNavigator(beanPicsBullet, true, beanSpecsBullet);
  }
}

var stickBeanTitleCheck = function(timeToStick, scrollTop) {
  if (!memoBeanTitleSticking && timeToStick[0]) {
    beanTitle.style.marginTop = '0px';
    beanTitle.classList.add('sticky-bean');
    beanTitlePositionStick = timeToStick[1]
    memoBeanTitleSticking = true;
    showBeanPics(true);
    switchNavigator(beanPicsBullet, true);
  } else if(beanTitlePositionStick >= scrollTop) {
    beanTitle.classList.remove('sticky-bean');
    beanTitle.style.marginTop = `50vh`;
    beanTitlePositionStick = undefined;
    memoBeanTitleSticking = false;
    showBeanPics(false);
    switchNavigator(beanPicsBullet, false);
  }
};

var showEmailSection = function(show) {
  if (show) {
    emailSectionContent.classList.remove('fadeout');
    emailSectionContent.classList.add('fadein');
    showBeanSpecs(false);
    showBeanPics(false);
    switchNavigator(emailBullet, true, creditBullet, beanSpecsBullet);
  } else {
    emailSectionContent.classList.remove('fadein');
    emailSectionContent.classList.add('fadeout');
    switchNavigator(emailBullet, false);
  }
}

// scroll events
window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (memoArrow) toggleArrow(arrowDown)
  var twsTitleSectionInView = checkElementInViewport(twsTitleSection, docHeightHalf);
  if (twsTitleSectionInView !== memoTwsTitleSectionInView) {
    toggleSection(twsSectionDeer, twsTitleSectionInView, 'fadein', 'fadeout');
    memoTwsTitleSectionInView = twsTitleSectionInView;
    switchNavigator(thingswesaidBullet, memoTwsTitleSectionInView)
  }

  var beanTitleInView = checkElementInViewport(beanTitle, 0, -docHeightHalf);
  if (beanTitleInView !== memoBeanTitleInView) {
    toggleSection(evoSide, beanTitleInView, 'fadein', 'fadeout');
    memoBeanTitleInView = beanTitleInView;
    switchNavigator(beanBullet, memoBeanTitleInView);
  }

  if (beanTitleInView) slideEvoSide(scrollTop);
  var beanTitleOnTop = isBeanTitleOnTop(beanTitle, scrollTop, 35);
  var unstick = beanTitlePositionStick >= scrollTop;
  var toggleStickClass = beanTitleOnTop[0] !== memoBeanTitleOnTop;
  if (toggleStickClass || unstick) stickBeanTitleCheck(beanTitleOnTop, scrollTop);
  memoBeanTitleOnTop = beanTitleOnTop[0];

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
    switchNavigator(creditBullet, true, emailBullet);
    beanTitle.classList.remove('fadein');
    beanTitle.classList.add('fadeout');
  }

  memoEmailSectionInView = emailSectionInView;
});
