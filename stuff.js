let COLS = 22
let ROWS = 6
let isMouseDown = false;
let activeColor = "orange"
const container = document.querySelector('#board');
const controls = document.querySelector('#controls');
init()

function init() {
  // Set up touch events.
  container.addEventListener('touchstart', (event) => { isMouseDown = true; clickCell(event) }, {passive: true});
  container.addEventListener('touchend', (event) => { isMouseDown = false}, {passive: true});
  container.addEventListener('touchmove', clickCell, {passive: true});
  container.addEventListener('mouseover', clickCell);

  controls.addEventListener('click', clickColour);

  // But don't double fire events on desktop.
  const hasTouchEvents = ('ontouchstart' in window);
  if (!hasTouchEvents) {
    container.addEventListener('mousedown', (event) => { isMouseDown = true; clickCell(event) });
    container.addEventListener('mouseup', () => isMouseDown = false);
  }

  // Draw the board.
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const d = document.createElement('button')
      d.setAttribute('aria-label', 'cell, empty');
      d.classList.add('pixel')
      container.appendChild(d)
    }
  }
}

function clickCell(event) {
  let button;
  
  // Check if this is a touch event or a mouse event.
  if (event.changedTouches) {
    button = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
  } else {
    button = event.target;
  }
  
  if (!button || button.localName !== 'button' || !isMouseDown) {
    return;
  }

  button.classList.toggle(activeColor)
}

function clickColour(event) {
  // Is there a previous selection?
  let prev = document.querySelector('#controls .selected');
  if (prev) {
    prev.classList.remove('selected')
  }
  // New one.
  let button = event.target;
  button.classList.toggle('selected')

  // What colour is it?
  let str = button.className.replace("pixel", "").replace("selected", "").trim()
  activeColor = str
}