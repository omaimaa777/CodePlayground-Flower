export const thing = document.getElementById("thing");

const state = {
  x: 0.5,
  y: 0.5,
  hue: 0,
  saturation: 100,
  lightness: 50,
  opacity: 1,
  size: 0.1,
  roundedness: 0,
  rotation: 0,
};

/* Colour-related functions */
export function setColour(h, s = 100, l = 50, a = 1, element = thing) {
  state.hue = h;
  state.saturation = s;
  state.lightness = l;
  state.opacity = a;
  if (element != null) {
    element.style.backgroundColor = `hsl(${ h }, ${ s }%, ${ l }%, ${ a })`;
  }
}

/* Position-related functions */
function transform(element = thing) {
  if (element != null) {
    element.style.transform = `translate(${ state.x * window.innerWidth }px, ${ state.y * window.innerHeight
      }px) rotate(${ state.rotation }deg)`;
  }
}

export function setPosition(x, y, element = thing) {
  state.x = x;
  state.y = y;

  if (element != null) {
    transform(element);
  }
}

export function setSize(size, element = thing) {
  state.size = size;

  if (element != null) {
    element.style.width = `${ size }px`;
    element.style.height = `${ size }px`;
  }
}

export function setRotation(rotation, element = thing) {
  state.rotation = rotation;
  if (element != null) {
    transform(element);
  }
}

export function setRoundedness(roundedness, element = thing) {
  state.roundedness = roundedness;

  if (element != null) {
    element.style.borderRadius = `${ roundedness * 100 }%`;
  }
}
