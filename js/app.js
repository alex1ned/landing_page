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

// To DO:
// - Hide navbar when not scrolling
// - Add scroll to top button
// - Make sections collapsible on click



// *** Global Variables ***
const numberOfSections = document.querySelectorAll('section').length;
const sectionsArray = document.querySelectorAll('section');
const sectionHeadersArray = document.querySelectorAll('.landing__container h2');
const navbarList = document.querySelector('#navbar__list');
const mainBody = document.querySelector('main');

// *** Helper Functions ***
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

// To do:
// - Needs to be refactored to when element is initially collapsed
//    - height of element in css need to be 0 instead of auto
// - Delete the console.log() debuggers

function collapseContent(elementToCollapse) {
  // Get the height of the element's inner content
  const contentHeight = elementToCollapse.scrollHeight;
  console.log("In Collapsing Function!");

  // Temporarily disable all css transitions
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

  // mark the section as "currently collapsed"
  elementToCollapse.setAttribute('is-collapsed', 'true');
}

function expandContent(elementToExpand) {
  // Get the height of the element's inner content
  const contentHeight = elementToExpand.scrollHeight;
  console.log("In Expanding Function!");

  // Have the element transition to the height of its inner content
  elementToExpand.style.height = contentHeight + 'px';

  elementToExpand.addEventListener('transitionend', function(e) {
    elementToExpand.removeEventListener('transitionend', arguments.callee);

    // Remove "height" from the element's inline styles, so it can return to its initial value
    elementToExpand.style.height = null;
  });

  // mark the section as "currently not collapsed"
  elementToExpand.setAttribute('is-collapsed', 'false');
}

// sectionHeadersArray[1].addEventListener('click', function(evt) {
//   console.log("Is clicked");
//   const contentToToggleCollapse = sectionHeadersArray[1].nextElementSibling;
//   const isCollapsed = contentToToggleCollapse.getAttribute('is-collapsed');
//
//   console.log('');
//   console.log('Collapsed is set to: ' + isCollapsed);
//
//   if(isCollapsed === 'true') {
//     expandContent(contentToToggleCollapse)
//     contentToToggleCollapse.setAttribute('is-collapsed', 'false')
//   } else if (isCollapsed === 'false') {
//     collapseContent(contentToToggleCollapse)
//   }
// });


for (let i = 0; i < numberOfSections; i++) {
  sectionHeadersArray[i].addEventListener('click', function(evt) {
    console.log("Is clicked");
    const contentToToggleCollapse = sectionHeadersArray[i].nextElementSibling;
    const isCollapsed = contentToToggleCollapse.getAttribute('is-collapsed');

    console.log('');
    console.log('Collapsed is set to: ' + isCollapsed);

    if(isCollapsed === 'true') {
      expandContent(contentToToggleCollapse)
      contentToToggleCollapse.setAttribute('is-collapsed', 'false')
    } else if (isCollapsed === 'false') {
      collapseContent(contentToToggleCollapse)
    }
  });
}









// !!! ------- Other to do

// Hide navBar when not scrolling (but should be there at pageLoad)
// - setTimeout can be used to check whether user stops scrolling

// Add scroll to top button at end which only appears if user scrols below
// the fold of the page
