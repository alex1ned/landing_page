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
// Commit

// -------------------------------- Project layout
// 1) Navigation Bar


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
    newNavChild.className = class_name;
    newNavChild.textContent = sectionHeadersArray[i].textContent;
    navFragment.appendChild(newNavChild);
  }
  parent.appendChild(navFragment);
}

// Determines if the 'section' is in view
// - Returns true if yes and false otherwise
let isInView = function (section) {
    const sectionBinding = section.getBoundingClientRect();
    return (
        sectionBinding.top >= 0 &&
        sectionBinding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

let getIndexOfNodelist = function (nodeList, element) {
  for (let i = 0; i < numberOfSections; i++) {
    if (element === nodeList[i]) {
      return i;
    }
  }
  return -1;
}


// -------------------------------- BUILD NAV-BAR
createListItems(numberOfSections, 'li', 'menu__link', navbarList);



// -------------------------------- Add class 'active' to section near view
// !!! Temporary --- delete later
const header1 = sectionHeadersArray[0];
const header2 = sectionHeadersArray[1];
const header3 = sectionHeadersArray[2];
const header4 = sectionHeadersArray[3];
const header5 = sectionHeadersArray[4];
const header6 = sectionHeadersArray[5];
const header7 = sectionHeadersArray[6];


// Function for if section is in view
// !!! upponInView1 and upponInView2 need to be in one function
let uponInView1 = function (section) {
  if (isInView(section)) {
    const sectionParent = section.parentElement.parentElement;
    sectionParent.className = 'active';

    for (let i = 0; i < numberOfSections; i += 1) {
      if (sectionHeadersArray[i] !== section) {
        let otherSectionParent = sectionHeadersArray[i].parentElement.parentElement;
        otherSectionParent.removeAttribute('class');
      }
    }
  }
}

let uponInView2 = function (section) {
  const navListArray = document.querySelectorAll('.menu__link');
  const placeInArray = getIndexOfNodelist(sectionHeadersArray, section);
  if (isInView(section)) {
    // Go to navbar and set the class to 'active'
    navListArray[placeInArray].classList.add('active');
    // Remove all other class attributes of the list elements
    for (let i = 0; i < numberOfSections; i++) {
      if (i !== placeInArray) {
        navListArray[i].classList.remove('active');
      }
    }
  }
}

// !!! Can be redone using INTERSECTION OBSERVER (but it works)
// window.addEventListener('scroll', function() {
//   for (let i = 0; i < numberOfSections; i++) {
//     let element = sectionHeadersArray[i];
//     let position = element.getBoundingClientRect();
//     if(position.top < window.innerHeight && position.bottom >= 0) {
//       uponInView1(sectionHeadersArray[i]);
//       uponInView2(sectionHeadersArray[i]);
//     }
//   }
// });


let resetClassForSectionElements = () => {
  for (let i = 0; i < numberOfSections; i++) {
    sectionsArray[i].classList.remove('active');
  }
};

let indexCurrentlyActiveSection = () => {
  for (let i = 0; i < numberOfSections; i++) {
    if (sectionsArray[i].classList.contains('active')) {
      return i;
    }
  }
  return -1;
};

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


let observer = new IntersectionObserver((entries, observer) => {
  // isIntersecting is true when element and viewport are overlapping
  // isIntersecting is false when element and viewport don't overlap
  entries.forEach(entry => {
    // entry.target.value = entry.target.dataset;
    if(entry.isIntersecting) {
      // console.log(entries);
      // console.log(observer);
      resetClassForSectionElements();
      // console.log('Element ' + entry.target + ' is visible');
      entry.target.parentNode.parentNode.classList.add('active');
      resetClassForNavListElements();
      // observer.unobserve(entry.target);
    }
  });
});

//   if(entries[0].isIntersecting === true) {
//     console.log('Element has just become visible in screen');
//     console.log(entries);
//     // console.log(sectionList);
//     // uponInView1(sectionList);
//     // uponInView2(sectionList);
//   }
// }, { threshold: [0] });


// observer.observe(sectionHeadersArray[1]);
sectionHeadersArray.forEach(h2 => { observer.observe(h2) });



// Scroll to section on link click - to anchor ID using scrollTO event

// Hide navBar when not scrolling (but should be there at pageLoad)
// - setTimeout can be used to check whether user stops scrolling

// Add scroll to top button at end which only appears if user scrols below
// the fold of the page

// Make sections collapsible on click
