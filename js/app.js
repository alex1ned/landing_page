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

// *************************************************** Helper Functions
// Create the 'n' times 'li' items (with class name and text)
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

// Return index of <section> that currently has the class active
let indexCurrentlyActiveSection = () => {
  for (let i = 0; i < numberOfSections; i++) {
    if (sectionsArray[i].classList.contains('active')) {
      return i;
    }
  }
  return -1;
};

// Removes 'active' of classList for each <section> element
let resetClassForSectionElements = () => {
  for (let i = 0; i < numberOfSections; i++) {
    sectionsArray[i].classList.remove('active');
  }
};

// Removes 'active' of classList for each <li> element
// and set class of the correct <li> element to active
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
// Please note: The functionality, the sort of leaned on to the source below
// Source: https://codepen.io/brundolf/pen/dvoGyw

function collapseContent(elementToCollapse) {
  // Get the height of the element's inner content
  const contentHeight = elementToCollapse.scrollHeight;

  const elementTransition = elementToCollapse.style.transition;
  elementToCollapse.style.transition = '';

  // Set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function() {
    elementToCollapse.style.height = contentHeight + 'px';
    elementToCollapse.style.transition = elementTransition;

    // Transition content to height: 0
    requestAnimationFrame(function() {
      elementToCollapse.style.height = 0 + 'px';
    });
  });

  elementToCollapse.setAttribute('is-collapsed', 'true');
}

function expandContent(elementToExpand) {
  // Get the height of the element's inner content
  const contentHeight = elementToExpand.scrollHeight;

  // Have the element transition to the height of its inner content
  elementToExpand.style.height = contentHeight + 'px';

  elementToExpand.addEventListener('transitionend', function(e) {
    elementToExpand.removeEventListener('transitionend', arguments.callee);
  });

  elementToExpand.setAttribute('is-collapsed', 'false');
}

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
// * Determine when user scrolls below fold of page
// * If that happens increase the opacity of the BUTTON
//   to 1 (in css do this transition over 0.5s)
// * Add event handler to the button to scroll to top upon click
// * Let button disappear if user scrolls up again





// 6) -------------------------------- HIDE NAVBAR when NOT SCROLLING
// * Navbar should be there at page Load
// * Determine when user stops scrolling (setTimeout can be useful here)
//   --> If stops scrolling hide navbar (smoothly by shrinking height)
// * If user is scrolling the navbar should be there















// **************************** END OF FILE ****************************** //
