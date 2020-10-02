/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/


// *************************************************** Global Variables
const numberOfSections = document.querySelectorAll('section').length;
const sectionsArray = document.querySelectorAll('section');
const sectionHeadersArray = document.querySelectorAll('.landing__container h2');
const navbarList = document.querySelector('#navbar__list');
const mainBody = document.querySelector('main');
// ****************************************************************************



// *************************************************** Helper Functions
// ------- Create the 'n' times 'li' items (with class name and text)
function createListItems(numberOfSections, type, class_name, parent) {
  const navFragment = document.createDocumentFragment();
  for (let i = 0; i < numberOfSections; i++) {
    const newNavChild = document.createElement(type);
    const newNavChildAnchor = document.createElement('a');
    newNavChild.className = class_name;
    newNavChildAnchor.href = '#section' + (i+1);
    newNavChildAnchor.textContent = sectionHeadersArray[i].textContent;
    newNavChild.appendChild(newNavChildAnchor);
    navFragment.appendChild(newNavChild);
  }
  parent.appendChild(navFragment);
}

// ------- Return index of <section> that currently has the class active
let indexCurrentlyActiveSection = () => {
  for (let i = 0; i < numberOfSections; i++) {
    if (sectionsArray[i].classList.contains('active')) {
      return i;
    }
  }
  return -1;
};

// ------- Removes 'active' of classList for each <section> element
let resetClassForSectionElements = () => {
  for (let i = 0; i < numberOfSections; i++) {
    sectionsArray[i].classList.remove('active');
  }
};


// ------- Removes 'active' of classList for each <li> element
// ------- and set class of the correct <li> element to active
let resetClassForNavListElements = () => {
  const navListArray = document.querySelectorAll('.menu__link');
  let index = indexCurrentlyActiveSection();
  // Remove all classes
  for (let i = 0; i < numberOfSections; i++) {
    navListArray[i].classList.remove('active');
  }
  // Set currently active
  navListArray[index].classList.add('active');
};


// ------- Collapse the element that is passed as function argument
// Please note: The functionality, the sort of leaned on to the source below
// Source: https://codepen.io/brundolf/pen/dvoGyw
function collapseContent(elementToCollapse) {
  // Get the height of the element's inner content
  const contentHeight = elementToCollapse.scrollHeight;

  const elementTransition = elementToCollapse.style.transition;
  elementToCollapse.style.transition = '';

  // Set the element's height to  current px -> not transitioning out of 'auto'
  requestAnimationFrame(function() {
    elementToCollapse.style.height = contentHeight + 'px';
    elementToCollapse.style.transition = elementTransition;

    // Set content height to 0
    requestAnimationFrame(function() {
      elementToCollapse.style.height = 0 + 'px';
    });
  });
  // Change class attribute to 'true'
  elementToCollapse.setAttribute('is-collapsed', 'true');
}


// ------- Expand the element that is passed as function argument
// Please note: The functionality, the sort of leaned on to the source below
// Source: https://codepen.io/brundolf/pen/dvoGyw
function expandContent(elementToExpand) {
  // Get the height of the element's inner content
  const contentHeight = elementToExpand.scrollHeight;

  // Transition element to height of its inner content
  elementToExpand.style.height = contentHeight + 'px';

  elementToExpand.addEventListener('transitionend', function(e) {
    elementToExpand.removeEventListener('transitionend', arguments.callee);
  });
  // Change class attribute to 'false'
  elementToExpand.setAttribute('is-collapsed', 'false');
}
// ****************************************************************************



// *************************************************** FUNCTIONALITY
// 1) -------------------------------- BUILD NAV-BAR
createListItems(numberOfSections, 'li', 'menu__link', navbarList);


// 2) -------------------------------- OBSERVE when SECTIONS are in viewport
// ----------------------------------- and change classes accordingly
let observer = new IntersectionObserver((entries, observer) => {
  // isIntersecting is true when element and viewport are overlapping
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      resetClassForSectionElements();
      entry.target.parentNode.parentNode.classList.add('active');
      resetClassForNavListElements();
    }
  });
});
sectionHeadersArray.forEach(h2 => { observer.observe(h2) });


// 3) -------------------------------- SCROLL TO SECTION on click
const allAnchors = document.querySelectorAll('a');

for (let i = 0; i < numberOfSections; i++) {
  // EVENT LISTENER for each anchor element
  allAnchors[i].parentNode.addEventListener('click', function(evt) {
  evt.preventDefault();
  var targetElement = document.getElementById(`section${i+1}`).firstElementChild.firstElementChild;
  targetElement.scrollIntoView({
    block: 'center',
    behavior: 'smooth'
  });
});
}


// 4) -------------------------------- Make SECTIONS COLLAPSIBLE on click
// Add EVENT LISTENER for each 'h2' element of the webpage (each section)
for (let i = 0; i < numberOfSections; i++) {
  sectionHeadersArray[i].addEventListener('click', function(evt) {
    const contentToToggleCollapse = sectionHeadersArray[i].nextElementSibling;
    const isCollapsed = contentToToggleCollapse.getAttribute('is-collapsed');

    if(isCollapsed === 'true') {
      expandContent(contentToToggleCollapse)
      contentToToggleCollapse.setAttribute('is-collapsed', 'false')
    }
    else if (isCollapsed === 'false') {
      collapseContent(contentToToggleCollapse)
    }
  });
}


// 5) -------------------------------- SHOW 'back to top' button at end
// All done ... could be smoother scrolling

// --> Make button appear if scrolled down sufficiently
const createBackTopButton = () => {
  const buttonContainer = document.querySelector('.button-container');
  const windowHeight = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // If user scrolls up to 1px to the bottom
  if (windowHeight > (documentHeight - 1)) {
    buttonContainer.classList.add('active');
  }
};
window.addEventListener('scroll', createBackTopButton);

// --> Move up to top on click of button
const moveBackTop = () => {
  window.scrollTo(0, 0);
};

const buttonToTop = document.querySelector('.back-top-button');
buttonToTop.addEventListener('click', moveBackTop);



// 6) -------------------------------- HIDE NAVBAR when NOT SCROLLING (for 2 seconds)
window.addEventListener('scroll', function(evt) {
  // Select the navBar element
  const navBar = document.querySelector('.page__header');

  // Set timeout such that if user does not scroll for 2s, the
  // navBar element will collapse
  let timeoutID = setTimeout(function() {
    collapseContent(navBar);
  }, 2000);

  // If user is scrolling -> expand navBar
  expandContent(navBar);
});



// **************************** END OF FILE ****************************** //
