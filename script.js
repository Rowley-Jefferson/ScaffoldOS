// !!!! reminder to clean up

// Taskbar Time
setInterval(function ()
{document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();}, 1000);
// clock time
setInterval(function ()
{document.querySelector("#clockElement").innerHTML = new Date().toLocaleString();}, 1000);

// welcome window has the id of "welcome"
var welcomeScreen = document.querySelector("#welcomeWindow")
var welcomeScreenClose = document.querySelector("#welcomeWindowclose")

// clock window has the id of "clock"
var clockIcon = document.querySelector("#clockApp")
var clockScreen = document.querySelector("#clockWindow")
var clockScreenClose = document.querySelector("#clockWindowclose")

// make a window closable
function makeClosable(window) {
  var windowClose = document.querySelector("#" + window.id + "close")
  windowClose.addEventListener("click", () => closeWindow(window));
}
makeClosable(clockScreen)
makeClosable(welcomeScreen)

// window select
welcomeScreen.addEventListener("mousedown", function() {
  focusWindow(welcomeScreen);
});

clockScreen.addEventListener("mousedown", function() {
  focusWindow(clockScreen);
});

// icon select
clockIcon.addEventListener("click", function() {
  handleIconTap(clockIcon);
});

// close a window that is passed through as "element"
function closeWindow(element) {
  element.style.display = "none"
}

// ngl, i have no fucking idea what flex is, but my brain i son autopilotso ill figure it out later
function openWindow(element) {
  element.style.display = "block"
  focusWindow(element)
}

var topbar = document.querySelector("#taskbar")

var topIndex = 1
function focusWindow(element) {
  topIndex++;
  element.style.zIndex = topIndex;
  topbar.style.zIndex = topIndex + 1; 
  deselectIcon(selectedIcon)
}

// Make the DIV element draggable:
dragElement(document.getElementById("welcomeWindow"));
dragElement(document.getElementById("clockWindow"));

function initializeWindow(elementName) {
  var window = document.querySelector("#" + elementName)
  focusWindow(window)
  dragElement(window)
}

// My code -> Copy-pasted Code Barrier //

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = Math.max(topbar.offsetHeight + 8 + element.offsetHeight/2,element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// icon selected Handler
var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}

function deselectIcon(element) {
  if (element) element.classList.remove("selected")
  selectedIcon = undefined
}

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(clockScreen)
  } else {
    selectIcon(element)
  }
}