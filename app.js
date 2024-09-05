import { createElement } from './modules/createElement.js'
import { cursorPosition } from './services/cursorPosition.js'
import { baseSvg, example, commandsInterface } from './modules/examples.js'

const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelectorAll(el)

// const example = 'M4.5 6\nV6 9\nC5 15 8 20 12.5 21.5\nC17 20 20 15 20.5 9\nV6\nL12.5 3.5\nz'
const $$containerSampleIcons = $$('.sample-icon')

const $textarea = $('#commnands')
const $svg = $('#canvas')
const $layout = $svg.children[0]
const $wrapperDesign = $('.wrapper-design')
const $areaDesign = $('.area-desing')
const $heightArea = $('.height-area')
const $widthArea = $('.width-area')
const $buttonsPaths = $('.paths-buttons')
const $example = $('.example')
const $buttonRemovePath = $('.button-remove-path')
const $iconStrokeColor = $('.icon-stroke-color')
const $iconFillColor = $('.icon-fill-color')
const $buttonNewSvg = $('.button-new-svg')
const $buttonNewPath = $('.button-new-path')
const $suggestions = $('.suggestions')
const $filename = $('#filename')
const $buttonOpenHistoryFiles = $('#button-open-history-files')
const $buttonCloseHistoryFiles = $('.button-close-history-files')
const $wrapperFiles = $('.saved-files')
const $containerFiles = $('.files')
const $panelPositionCursor = $('#panel-position-cursor')
const $areaTemplate = $('.area-template')
const $imageTemplate = $('.image-template')
const $designImageTemplate = $('.design-image-template')
const $buttonUp = $('.button-up')
const $buttonDown = $('.button-down')
const $buttonLeft = $('.button-left')
const $buttonRight = $('.button-right')
const $buttonPlus = $('.button-plus')
const $buttonMinus = $('.button-minus')

const kbSizeIcon = $('.size')

let svgSelected = 0
let pathSelected = 0
let positionCursorX = 0
let positionCursorY = 0

const svgs = JSON.parse(localStorage.getItem('svgs')) || []
const config = JSON.parse(localStorage.getItem('config')) || { preview: false, stroke_width: 0.2, stroke: '#222', fill: 'none' }

const sizeWidth = 25
const sizeHeight = 25

const $styleBg = $('#styleBg')
const $styleStrokeWith = $('#styleStrokeWith')
const $styleStroke = $('#styleStroke')
const $styleFill = $('#styleFill')

init()

// if (!svgs) localStorage.setItem('svgs', JSON.stringify([ {"name": untitled(1), "paths": []} ]))

$example.addEventListener('click', prinExample)

$buttonOpenHistoryFiles.addEventListener('click', () => {
  createHistoryFiles()

  $wrapperFiles.style.display = 'flex'
  $wrapperFiles.style.width = '100%'
})

$buttonCloseHistoryFiles.addEventListener('click', () => {
  $wrapperFiles.style.display = 'none'
  $wrapperFiles.style.width = '0%'
})

$wrapperFiles.addEventListener('mouseleave', (event) => {
  $wrapperFiles.style.display = 'none'
  $wrapperFiles.style.width = '0%'
})

$svg.addEventListener('mousemove', (event) => viewPositionCursor(event, false))
$svg.addEventListener('mouseleave', (event) => viewPositionCursor(event, true))

$svg.addEventListener('click', (event) => {
  event.preventDefault()
  setEnter = true
  $textarea.value = $textarea.value + ` ${positionCursorX} ${positionCursorY}`
})

$filename.addEventListener('focus', (event) => document.getSelection().selectAllChildren(event.target))
$filename.addEventListener('input', (event) => {
  svgs[svgSelected].name = event.target.textContent
  localStorage.setItem('svgs', JSON.stringify(svgs))
})

$heightArea.addEventListener('change', () => {
  if ($heightArea.value < 1) $heightArea.value = 1
  if ($heightArea.value > 40) $heightArea.value = 40
  $layout.setAttribute('d', generateGrid($heightArea.value, $widthArea.value))
  calculateSize()

  // actualizamos los datos del svg en el array svgs y en el localstorage
  svgs[svgSelected].viewbox = `0 0 ${$widthArea.value} ${$heightArea.value}`
  localStorage.setItem('svgs', JSON.stringify(svgs))
})

$widthArea.addEventListener('change', () => {
  if ($widthArea.value < 1) $widthArea.value = 1
  if ($widthArea.value > 40) $widthArea.value = 40
  $layout.setAttribute('d', generateGrid($heightArea.value, $widthArea.value))
  calculateSize()

  // actualizamos los datos del svg en el array svgs y en el localstorage
  svgs[svgSelected].viewbox = `0 0 ${$widthArea.value} ${$heightArea.value}`
  localStorage.setItem('svgs', JSON.stringify(svgs))
})

$styleBg.addEventListener('change', changeAtributesToIcon)
$styleStrokeWith.addEventListener('change', changeAtributesToIcon)
$styleStroke.addEventListener('change', () => {
  const iconSvg = $styleStroke.nextElementSibling
  iconSvg.style.stroke = $styleStroke.value

  changeAtributesToIcon()
})
$styleFill.addEventListener('change', changeAtributesToIcon)

$buttonNewSvg.addEventListener('click', createNewSvg)

$buttonNewPath.addEventListener('click', () => {
  // eliminamos estilo 'active' de todos los botones de paths
  //$buttonsPaths.childNodes.forEach((el) => el.classList.remove('active'))
  $$('.paths-buttons button').forEach((el) => el.classList.remove('active'))

  // creamos un nuevo path y lo insertamos en el DOM (editor && sample icons)
  const newPath = createElement(
    'path',
    {
      attributes: [
        { name: 'd', value: '' },
        { name: 'stroke', value: '#222' },
        { name: 'stroke-width', value: '0.2' },
        { name: 'fill', value: 'none' }
      ]
    },
    null
  )

  /* const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  newPath.setAttribute('d', '')
  newPath.setAttribute('stroke', '#222')
  newPath.setAttribute('stroke-width', '0.2') */

  $svg.appendChild(newPath)
  $$containerSampleIcons.forEach((el) => el.children[0].appendChild(newPath.cloneNode(true)))

  // save new path in svgs
  svgs[svgSelected].paths.push({
    stroke: '#222',
    stroke_width: '0.2',
    fill: 'none',
    path: ''
  })

  localStorage.setItem('svgs', JSON.stringify(svgs))

  $styleFill.value = 'none'
  $styleStroke.value = '#222'
  $styleStrokeWith.value = '0.2'

  // actualizamos la variable pathSelected
  pathSelected = svgs[svgSelected].paths.length - 1

  // Crea botones para los paths del svg e inserta el nuevo path en el DOM
  createElement(
    'button',
    {
      attributes: [{ name: 'data-index', value: pathSelected }],
      textContent: `#${pathSelected}`,
      className: ['active']
    },
    $buttonsPaths
  )

  // limpiamos el textarea
  $textarea.value = ''

  calculateSize()
})

$buttonRemovePath.addEventListener('click', () => {
  if (svgs[svgSelected].paths.length === 1) return

  // eliminamos el path del svg principal (editor)
  $svg.removeChild($svg.children[pathSelected + 1])

  // eliminamos el path de los iconos de muestra (sample icons)
  $$containerSampleIcons.forEach((el) => el.children[0].removeChild(el.children[0].children[pathSelected]))

  // eliminamos el boton del path seleccionado
  $buttonsPaths.removeChild($buttonsPaths.children[pathSelected])

  // eliminamos el path del array svgs
  svgs[svgSelected].paths.splice(pathSelected, 1)

  // actualizamos la variable pathSelected
  pathSelected = 0

  // añadimos la clase active al primer path
  $buttonsPaths.children[0].classList.add('active')

  // Cambiamos los atributos del iconos fill y stroke_width
  $styleFill.value = svgs[svgSelected].paths[pathSelected].fill
  $styleStroke.value = svgs[svgSelected].paths[pathSelected].stroke
  $styleStrokeWith.value = svgs[svgSelected].paths[pathSelected].stroke_width

  // Actualizamos el textarea
  $textarea.value = svgs[svgSelected].paths[pathSelected].path

  // Actualizamos el localstorage
  localStorage.setItem('svgs', JSON.stringify(svgs))

  calculateSize()
})

// Evento para seleccionar un path
$buttonsPaths.addEventListener('click', (event) => {
  const { index } = event.target.dataset

  pathSelected = parseInt(index)

  $textarea.value = svgs[svgSelected].paths[pathSelected].path

  // eliminamos estilo 'active' de todos los botones de paths
  $$('.paths-buttons button').forEach((el) => el.classList.remove('active'))
  event.target.classList.add('active')

  // Cambiamos los atributos del iconos fill y stroke
  $styleFill.value = svgs[svgSelected].paths[pathSelected].fill
  $styleStroke.value = svgs[svgSelected].paths[pathSelected].stroke
  $styleStrokeWith.value = svgs[svgSelected].paths[pathSelected].stroke_width

  const colorStroke = svgs[svgSelected].paths[pathSelected].stroke
  const colorFill = svgs[svgSelected].paths[pathSelected].fill

  $iconStrokeColor.style.stroke = colorStroke
  $iconFillColor.style.borderColor = colorFill !== 'none' ? colorFill : '#222'
})

// buttons template
let scale = 1
$buttonPlus.addEventListener('click', () => {
  scale += 0.1
  $designImageTemplate.children[0].style.transform = `scale(${scale})`
})

$buttonMinus.addEventListener('click', () => {
  scale -= 0.1
  $designImageTemplate.children[0].style.transform = `scale(${scale})`
})

function prepareDashboard(file = null) {
  if (!file) svgSelected = svgs.length - 1
  pathSelected = 0

  const lastSvg = file ?? svgs[svgSelected]

  const { name, paths } = lastSvg
  const { path, stroke, stroke_width, fill } = paths[0]

  $filename.textContent = name
  $textarea.value = path

  $styleStrokeWith.value = stroke_width
  $styleStroke.value = stroke
  $styleFill.value = fill

  $heightArea.value = sizeHeight
  $widthArea.value = sizeWidth

  $iconStrokeColor.style.stroke = stroke
  $iconFillColor.style.borderColor = fill

  // Limpiamos los botones que hacer referencia a los paths del svg
  $buttonsPaths.innerHTML = ''

  const numPaths = Array.from($svg.children)

  for (let i = 1; i < numPaths.length; i++) {
    $svg.removeChild(numPaths[i])
  }

  for (let i = 0; i < $$containerSampleIcons.length; i++) {
    const numPaths = Array.from($$containerSampleIcons[i].children[0].children)

    for (let j = 0; j < numPaths.length; j++) {
      $$containerSampleIcons[i].children[0].removeChild(numPaths[j])
    }
  }

  paths.forEach(({ path, stroke, stroke_width, fill }, index) => {
    // Crea los paths del svg principal (editor)
    createElement(
      'path',
      {
        attributes: [
          { name: 'd', value: path ?? '' },
          { name: 'stroke', value: config.stroke },
          { name: 'stroke-width', value: config.stroke_width },
          { name: 'fill', value: config.fill }
        ]
      },
      $svg
    )

    // Crea los paths para cada uno de los iconos de muestra (sample icons)
    $$containerSampleIcons.forEach((el) => {
      createElement(
        'path',
        {
          attributes: [
            { name: 'd', value: path },
            { name: 'stroke', value: stroke },
            { name: 'stroke-width', value: stroke_width },
            { name: 'fill', value: fill }
          ]
        },
        el.children[0]
      )
    })

    // Crea botones para seleccionar los paths del svg
    createElement(
      'button',
      {
        attributes: [{ name: 'data-index', value: index }],
        textContent: `#${index}`
      },
      $buttonsPaths
    )
  })

  // añadimos la clase active al primer path
  $buttonsPaths.children[0].classList.add('active')

  addCommands(path, false)

  // changeAtributesToIcon()
  calculateSize()
}

function init() {
  // Pinta el grid en el area de diseño
  $layout.setAttribute('d', generateGrid(sizeHeight, sizeWidth))

  // Si no hay archivos guardados en el localstorage, añade el contenido de baseSvg
  if (!svgs.length) {
    svgs.push(baseSvg)
    localStorage.setItem('svgs', JSON.stringify(svgs))
  }

  // Prepara el dashboard con los datos del ultimo svg guardado
  prepareDashboard()
  createHistoryFiles()
}

function generateEvents() {
  const $loadFile = $$('.file')
  $loadFile.forEach((el) => {
    el.addEventListener('click', (event) => {
      const parent = event.target.parentNode
      const { index } = parent.dataset

      svgSelected = index

      prepareDashboard(svgs[index])

      $wrapperFiles.style.display = 'none'
      $wrapperFiles.style.width = '0%'
    })
  })

  const $deleteFile = $$('.delete-file')
  $deleteFile.forEach((el) => {
    el.addEventListener('click', (event) => {
      const { index } = event.target.dataset

      svgs.splice(index, 1)
      localStorage.setItem('svgs', JSON.stringify(svgs))

      prepareDashboard()
    })
  })
}

function createHistoryFiles() {
  let files = ''

  svgs.map(({ name, date, size, viewbox, paths }, index) => {
    files += `
      <div class="file index${index}" data-index="${index}">
        <div class="icon-file">
          <svg viewBox="${viewbox}" width="28" height="28">
            ${paths
              .map(({ path, stroke, stroke_width, fill }) => {
                return `<path d="${path.replaceAll('\n', ' ')}" stroke="${stroke}" stroke-width="${stroke_width}" fill="${fill}"></path>`
              })
              .join('')}
          </svg>
        </div>
        <div class="info-file" data-index="${index}">
          <div class="name-file">${name}.svg</div>
          <div class="data-file">${date}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${size} kb</div>
        </div>
        <div style="display: flex;">
          <div class="delete-file" data-index="${index}" style="position: absolute; background: '#fff'; opacity: 0.5; width: 100%; height: 100%; z-index: 1"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke="currentColor"  stroke-width="1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </div>
      </div>
    `
  })

  $containerFiles.innerHTML = files
  generateEvents()
}

function generateGrid(height = 25, width = 25) {
  let template = ''

  const widthSvg = width * 14
  $wrapperDesign.style.width = `${widthSvg}px`

  for (let i = 0; i < height; i++) template += `M0 ${i} H${width}`
  for (let i = 0; i < width; i++) template += `M${i} 0 V${height}`

  template += `M0 0 V${height} H${width} V0z`

  // set attribute viewbox to all svg
  $$('.allsvg').forEach((el) => el.setAttribute('viewBox', `0 0 ${width} ${height}`))

  return template
}

function viewPositionCursor(event, hide) {
  const { x, y, offsetX, offsetY } = cursorPosition(event, $svg)

  $panelPositionCursor.style.display = hide ? 'none' : 'flex'

  if (hide) return

  $panelPositionCursor.style.top = offsetY + 'px'
  $panelPositionCursor.style.left = offsetX + 20 + 'px'

  $panelPositionCursor.innerHTML = `<div>X: ${x}</div><div>Y: ${y}</div>`

  positionCursorX = x
  positionCursorY = y
}

// create new svg
function createNewSvg() {
  svgs.push(baseSvg)
  localStorage.setItem('svgs', JSON.stringify(svgs))

  prepareDashboard()

  $wrapperFiles.style.display = 'none'
  $wrapperFiles.style.width = '0%'
}

function addCommands(textarea, save = true) {
  const codeToPrint = textarea.replaceAll('\n', ' ')

  // Colocamos en el area de diseño el codigo para que se vea el icono
  $svg.children[pathSelected + 1].setAttribute('d', codeToPrint)

  // Cambiamos el codigo de los iconos pequeños de muestra
  for (let i = 0; i < $$containerSampleIcons.length; i++) $$containerSampleIcons[i].children[0].children[pathSelected].setAttribute('d', codeToPrint)

  // Cambiamos el codigo del svg en el array svgs y en el localstorage
  if (save) {
    svgs[svgSelected].paths[pathSelected].path = textarea
    localStorage.setItem('svgs', JSON.stringify(svgs))
  }
}

function prinExample() {
  svgs.push(example)
  localStorage.setItem('svgs', JSON.stringify(svgs))

  prepareDashboard()
}

let setSpace = false
let setLetter = false
let setEnter = false

$textarea.addEventListener('keyup', onKey)

function onKey({ code, key }) {
  const lines = $textarea.value.split('\n')
  const lastLine = lines[lines.length - 1]

  console.clear()

  const commands = lastLine.split(' ')
  const [letter, ...values] = commands

  $suggestions.innerHTML = commandsInterface[`Key${letter.toUpperCase()}`]?.description ?? ''

  const numCommands = commandsInterface[`Key${letter.toUpperCase()}`]?.numberCommands

  if (code === 'Enter') {
    if (!setEnter) {
      const undo = $textarea.value.substring(0, $textarea.value.length - 1)
      $textarea.value = undo
      return
    }

    addCommands($textarea.value)
    calculateSize()
    $suggestions.innerHTML = ''

    setLetter = false
    setEnter = false
    setSpace = false
  } else {
    console.table({ setSpace, setLetter, setEnter, letter })

    setSpace = setLetter && !values.length
    setEnter = numCommands === values.length && values[values.length - 1] !== ''
    setLetter = letter !== '' && commandsInterface.hasOwnProperty(`Key${letter.toUpperCase()}`)

    console.table({ setSpace, setLetter, setEnter, letter, key, code })

    if (setSpace && key !== 'Backspace' && key !== 'Shift') {
      $textarea.value = $textarea.value.substring(0, $textarea.value.length - 1) + ' ' + key
      return
    }

    if (!setLetter && code.indexOf('Key') === -1 && key !== 'Backspace') {
      $textarea.value = $textarea.value.substring(0, $textarea.value.length - 1)
      return
    }

    /* if (setLetter && setSpace && key !== 'Backspace' && key !== 'Shift') {
      const undo = $textarea.value.substring(0, $textarea.value.length - 1)

      $textarea.value = undo + ' ' + key
      setSpace = false
    } */
  }
}

function changeAtributesToIcon() {
  for (let i = 0; i < $$containerSampleIcons.length; i++) {
    $$containerSampleIcons[i].style.backgroundColor = $styleBg.value

    $$containerSampleIcons[i].children[0].children[pathSelected].setAttribute('fill', $styleFill.value)
    $$containerSampleIcons[i].children[0].children[pathSelected].setAttribute('stroke', $styleStroke.value)
    $$containerSampleIcons[i].children[0].children[pathSelected].setAttribute('stroke-width', $styleStrokeWith.value)

    // Cambiamos los atributos del svg en el array svgs y en el localstorage
    svgs[svgSelected].paths[pathSelected].fill = $styleFill.value
    svgs[svgSelected].paths[pathSelected].stroke = $styleStroke.value
    svgs[svgSelected].paths[pathSelected].stroke_width = $styleStrokeWith.value

    localStorage.setItem('svgs', JSON.stringify(svgs))
  }

  $iconStrokeColor.style.stroke = $styleStroke.valuecursorPosition
  $iconFillColor.style.borderColor = $styleFill.value

  calculateSize()
}

function calculateSize() {
  const svgElement = $('#cent28')
  const svgString = new XMLSerializer().serializeToString(svgElement)
  const byteSize = new Blob([svgString]).size

  kbSizeIcon.textContent = `size: ${(byteSize / 1024).toFixed(2)} kb`

  // Guardamos el dato en el localstorage
  svgs[svgSelected].size = (byteSize / 1024).toFixed(2)
}

// Drag and drop image template to design area
$areaTemplate.addEventListener('dragleave', handleDragLeave)
$areaTemplate.addEventListener('drop', handleDropFromDesktop)
$areaTemplate.addEventListener('dragover', handleDragOverFromDesktop)

function createImg(src) {
  const image = document.createElement('img')
  image.src = src
  image.classList.add('image-template')

  $areaTemplate.appendChild(image)
  $designImageTemplate.appendChild(image.cloneNode(true))
  return image
}

function useFilesToCreateElements(files) {
  console.log('File name:', files[0].name)
  console.log('File size:', files[0].size)
  console.log('File type:', files[0].type)

  if (files && files.length > 0) {
    const reader = new FileReader()

    reader.onload = (eventReader) => {
      const src = eventReader.target.result
      createImg(src)
    }

    reader.onerror = (error) => {
      console.error('Error reading file:', error)
    }

    try {
      reader.readAsDataURL(files[0])
    } catch (error) {
      console.error('Error starting to read file:', error)
    }
  } else {
    console.error('No files provided or files array is empty')
  }
}

function handleDragOverFromDesktop(event) {
  event.preventDefault()

  const { currentTarget, dataTransfer } = event
  if (dataTransfer.types.includes('Files')) {
    currentTarget.classList.add('over-files')
  }
}

function handleDropFromDesktop(event) {
  event.preventDefault()

  // si ya existe una imagen en el area de diseño, la eliminamos
  const images = $$('.image-template')
  images.forEach((el) => el.remove())

  const { currentTarget, dataTransfer } = event
  const files = dataTransfer.files

  useFilesToCreateElements(files)
  currentTarget.classList.remove('over-files')
}

function handleDragLeave(event) {
  event.preventDefault()

  const { currentTarget } = event
  currentTarget.classList.remove('over-files')
}
