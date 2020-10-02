# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Layout of JS file](#layout-of-JS-file)
* [Functionality that was added](#functionality-that-was-added)
* [Things to improve](#things-to-improve)


## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.


## Layout of JS file

The following sections were added.

* Global variables
* Helper functions
* Actual functionality
	1. Create the navgation par 'li' elements.
	2. Observe when section's is in viewport and change styling (by changing the class to 'active'.
	3. Scroll to correct section when clicking on one of the navBar elements.
	4. Makes sections collapse on click - and expand if already collapsed.
	5. Add back to top button if user scrolls to bottom.
	6. Hide navBar when not scrolling and show it again when scrolling.


## Functionality that was added

### Create the navgation par 'li' elements.
This takes the class name as well as the content into consideration.


### Observe when section's is in viewport
Changes the class name of the section that is in viewport to active and removes the active class name from all other classed. Here the 'intersectionObserver API' is due to better performance relative to listening for a 'scroll' event.

### Scroll to correct section on clicking
When clicking on one of the navBar elements, the window is, smoothly, scrolled to the appropriate section.

### Makes sections collapse on click
Sections are by default collapsed and the user can expand it on click - and also collapse it again. This is done by smoothly setting the height of the content container to 0 or auto.

### Add back to top button if user scrolls to bottom
If user scrolls up to 1px to the bottom of the page the the back to top botton will show up.

### Hide navBar when not scrolling 
NavBar shows up on initial page load. When user tops scrolling for 2 seconds the navBar will collapse smoothly. Same helper function as under point 4 are recycled).


## Things to improve

* When clicking on back to top button the window is not smoothly scrolled but jumps back up. This should be changed.
* While showing the navBar works fine when the user stops scrolling, there seems to be a bug when the user stops scrolling and it should collapse again. It does collapse but sometimes it does not do it smoothly.
