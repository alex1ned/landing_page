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


// !!! Temporary --- delete later
// const header1 = sectionHeadersArray[0];
// const header2 = sectionHeadersArray[1];
// const header3 = sectionHeadersArray[2];
// const header4 = sectionHeadersArray[3];
// const header5 = sectionHeadersArray[4];
// const header6 = sectionHeadersArray[5];
// const header7 = sectionHeadersArray[6];



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
      // observer.unobserve(entry.target);
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

// On Click - what needs to happen?
// - make <section> element min-height: 80 or revert to 0vh again
// - make 'display' of 'section .landing__container p' to 'block' or
//   reverse again to 'display: none'
//  !! How to toggle?

for (let i = 0; i < numberOfSections; i++) {
  sectionHeadersArray[i].addEventListener('click', function(evt) {
    const sectionParent = sectionHeadersArray[i].parentNode.parentNode;
    const sectionChildrenArray = sectionHeadersArray[i].parentNode.querySelectorAll('p');
    for (let i = 0; i < sectionChildrenArray.length; i++) {
      sectionChildrenArray[i].style.display = 'block';
      // sectionChildrenArray[i].style.transition = 'ease 1.3s';
    }
    sectionParent.style.minHeight = '80vh';
    // sectionParent.style.transition = 'ease 1.3s';
  });
}















// !!! ------- Other to do

// Hide navBar when not scrolling (but should be there at pageLoad)
// - setTimeout can be used to check whether user stops scrolling

// Add scroll to top button at end which only appears if user scrols below
// the fold of the page

// Make sections collapsible on click
