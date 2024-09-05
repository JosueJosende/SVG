/**
 * @description Create a new element and append it to the parent element
 *
 * @param {String} tagName
 * @param {Array} props
 * -------------------------------
 * @param {Object} attributes
 * @param {Array} className
 * @param {String} textContent
 * -------------------------------
 * @param {Object} parent
 */

export const createElement = (tagName, props, parent) => {
  const elements = ['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'text', 'g', 'defs', 'symbol', 'use', 'image', 'clipPath', 'mask', 'filter', 'foreignObject', 'linearGradient', 'radialGradient', 'stop', 'pattern', 'textPath', 'tspan', 'animate', 'animateMotion', 'animateTransform', 'mpath', 'set', 'discard']

  const { attributes, className, textContent } = props

  let newElement

  if (elements.includes(tagName)) {
    newElement = document.createElementNS('http://www.w3.org/2000/svg', tagName)
  } else {
    newElement = document.createElement(tagName)
  }

  if (attributes && attributes.length) {
    attributes.forEach((attr) => {
      newElement.setAttribute(attr.name, attr.value)
    })
  }

  if (className && className.length) {
    className.forEach((cls) => {
      newElement.classList.add(cls)
    })
  }

  if (textContent) {
    newElement.textContent = textContent
  }

  if (!parent) return newElement

  parent.appendChild(newElement)
}
