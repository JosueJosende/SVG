const example = 'M4.5 6\nV6 9\nC5 15 8 20 12.5 21.5\nC17 20 20 15 20.5 9\nV6\nL12.5 3.5\nz'
const containerIcon = document.getElementsByClassName('ico')
const textarea = document.getElementById('commnands')
const canvas = document.getElementById('canvas')
const bg = document.getElementById('canvas').children[0]
bg.setAttribute('d', 'M0 1 H0 25 M5 2 H0 25 M10 3 H0 25 M15 4 H0 25 M20 5 H0 25 M25 6 H0 25 M30 7 H0 25 M35 8 H0 25 M40 9 H0 25 M45 10 H0 25 M50 11 H0 25 M55 12 H0 25 M60 13 H0 25 M65 14 H0 25 M70 15 H0 25 M75 16 H0 25 M80 17 H0 25 M85 18 H0 25 M90 19 H0 25 M95 19 H0 25 M100 20 H0 25 M105 21 H0 25 M110 22 H0 25 M115 23 H0 25 M120 23 H0 25 M125 24 H0 25 M1 0 V5 25 M2 0 V10 25 M3 0 V15 25 M4 0 V20 25 M5 0 V25 25 M6 0 V30 25 M7 0 V35 25 M8 0 V40 25 M9 0 V45 25 M10 0 V50 25 M11 0 V55 25 M12 0 V60 25 M13 0 V65 25 M14 0 V70 25 M15 0 V75 25 M16 0 V80 25 M17 0 V85 25 M18 0 V90 25 M19 0 V95 25 M20 0 V100 25 M21 0 V105 25 M22 0 V110 25 M23 0 V115 25 M24 0 V120 25 M0 0 V25 H25 V0z' )

const drawIcon = document.getElementById('canvas').children[1]

const styleBg = document.getElementById('styleBg')
const styleStrokeWith = document.getElementById('styleStrokeWith')
const styleStroke = document.getElementById('styleStroke')
const styleFill = document.getElementById('styleFill')

let commandsIcon = ''
let precode = []



function getCursor(event, hide) {
  const infoElement = document.getElementById('info');

  if(hide) {
     infoElement.style.display = "none";
      return
  } 

  const x = event.clientX
  const y = event.clientY
  const x_plus = ((event.clientX - canvas.getBoundingClientRect().left)/14).toFixed(1)
  const y_plus = ((event.clientY - canvas.getBoundingClientRect().top)/14).toFixed(1)
  let _position = `<div>X: ${x_plus}</div><div>Y: ${y_plus}</div>`;

  infoElement.innerHTML = _position;
  infoElement.style.display = "flex";
  infoElement.style.top = y + "px";
  infoElement.style.left = (x + 20) + "px";
}

function addCommands(sCommands) {
  // funcion que condicione lo que se va a dibujar
  //console.log(sCommands.split('\n'));
  let puntos = []
  let command = sCommands.split('\n')
  let offsets = []
  let newPath = ''

  for(let i = 0; i < command.length; i++) {
    let p = command[i].replace(/[a-zA-Z]/g, '').split(' ')
    puntos.push(p.slice(p.length - 2, p.length))

    if(command[i].charAt(0) == 'Q') {
      offsets.push(command[i].replace('Q', '').split(' ').slice(0, 2))
      newPath = `M${puntos[i-1][0]} ${puntos[i-1][1]} L${offsets[i][0]} ${offsets[i][1]}`

      canvas.appendChild(document.createElement('path'))
      canvas.lastChild.setAttribute('stroke', '#333333')
      canvas.lastChild.setAttribute('stroke-width', '.1px')
      canvas.lastChild.setAttribute('d', newPath)

    } else {
      offsets.push('')
    }
  
  }
  console.log(puntos);
  console.log(offsets);
  console.log(newPath);


  precode.length = 0
  precode.push(sCommands)
  
  commandsIcon = precode[0].split('\n').join(' ')
  drawIcon.setAttribute('d', commandsIcon)

  for(let i = 0; i < containerIcon.length; i++) containerIcon[i].children[0].children[0].setAttribute('d', commandsIcon)
}

function prinExample() {
  textarea.value = example
  addCommands(example)
}

function clearIcon() {
  textarea.value = ''
  drawIcon.setAttribute('d', '')
}


textarea.addEventListener("keyup", function(evt) {
  const keycodes = [8, 13]
  if (keycodes.includes(evt.keyCode)) addCommands(textarea.value)
  /*let reg = /^[a-zA-Z0-9 \s\.]/*/
})

styleBg.addEventListener('change', (event) => {
  for(let i = 0; i < containerIcon.length; i++) containerIcon[i].style.backgroundColor = styleBg.value
})

styleStrokeWith.addEventListener('change', (event) => {
  for(let i = 0; i < containerIcon.length; i++) containerIcon[i].children[0].setAttribute('stroke-width', styleStrokeWith.value)
})

styleStroke.addEventListener('change', (event) => {
  for(let i = 0; i < containerIcon.length; i++) containerIcon[i].children[0].setAttribute('stroke', styleStroke.value)
})

styleFill.addEventListener('change', (event) => {
  for(let i = 0; i < containerIcon.length; i++) containerIcon[i].children[0].setAttribute('fill', styleFill.value)
})







/*var iPosition = 0;

function points(iCount, current) {
	if (iCount <= 0) {
		iPosition += 1;
		return current;
	}
	if (typeof current !== "undefined") {
		iPosition += 1;
	} else {
		current = "";
	}
	return points(
		--iCount,
		current + "%" + iPosition + "% %" + ++iPosition + "% "
	);
}

function addCommand(sType) {
	var ucCommand = sType.toUpperCase();
	if ("ML".indexOf(ucCommand) > -1) {
		return sType + " " + points(1);
	} else {
		if ("C".indexOf(ucCommand) > -1) {
			return sType + " " + points(3);
		} else {
			if ("Q".indexOf(ucCommand) > -1) {
				return sType + " " + points(2);
			}
		}
	}
}

function addCommands(sCommands, data) {
	var d = "";
	for (var i = 0; i < sCommands.length; i++) {
		d += addCommand(sCommands.substr(i, 1));
	}
	var result = {
		d: d,
		data: []
	};
	for (var i = 0; i < iPosition; i++) {
		result.data.push(typeof data[i] !== "undefined" ? data[i] : 0);
	}

	return result;
}


var cx = 100,
	cy = 250,
	draw = addCommands("MVCCVLZ", [
		4.5,
		6,
		6,
		9,
		5,
		15,
		8,
		20,
		12.5,
		21.5,
		17,
		20,
		20,
		15,
		20.5,
		9,
		6,
		12.5,
		3.5
	]),
	curves = [
		{
			d: draw.d,
			init: draw.data
		}
	],
	curve = "",
	currentCurve = 0,
	$curve = $("#curve"),
	$data = $(".data"),
	$log = $(".log"),
	$grid = $("#grid"),
	active = -1;

function setActive(a) {
	if (a !== active) {
		//snap();
	}
	active = a;
}

// Find your root SVG element
var svg = document.querySelector("svg");

// Create an SVGPoint for future math
var pt = svg.createSVGPoint();

// Get point in global SVG space
function cursorPoint(evt) {
	var touches = evt.changedTouches;
  console.log(touches);
  
	if (touches) {
		return getXY(touches[0].clientX, touches[0].clientY, true)
	}
	return getXY(evt.clientX, evt.clientY, true);
}

function getXY(x, y, inverse) {
	pt.x = x;
	pt.y = y;
	return !!inverse ? pt.matrixTransform(svg.getScreenCTM().inverse()) : pt;
}

function generateCurveData(x, y, activePoint) {
	var curveToDraw = curves[currentCurve];
	var d = curveToDraw.d;
	var sHTML = curveToDraw.d;
	var points = curveToDraw.init;
	var ptno = 0;
	for (var point = 0; point < points.length; point += 2) {
		var px = ptno === activePoint
			? x
			: typeof points[point] === "undefined" ? 0 : points[point];
		var py = ptno === activePoint
			? y
			: typeof points[point + 1] === "undefined" ? 0 : points[point + 1];
		curveToDraw.init[point] = px;
		curveToDraw.init[point + 1] = py;
		d = d.replace("%" + point + "%", px).replace("%" + (point + 1) + "%", py);
		sHTML = sHTML
			.replace("%" + point + "%", (ptno === activePoint ? "<mark>" : "") + px)
			.replace(
				"%" + (point + 1) + "%",
				py + (ptno === activePoint ? "</mark>" : "")
			);
		ptno++;
	}
	var curveData = {
		d: d,
		html: sHTML
	};
	return curveData;
}

function handleMouseMove(evt) {
	
	var loc = cursorPoint(evt);
	var x = loc.x;
	var y = loc.y;


	if (evt.buttons !== 0 || curve == "") {
		curve = generateCurveData(x, y, active);
	}

	var grid = curve.d.replace(/[^0-9.]/g, " ").split(" ").filter(function(ele) {
		return ele != "";
	});
	var sGrid = "";
	var ptno = 0;
	var path = "";
	var gridPath = '<path class="gridPath" d="M %path%" />';
	for (var point = 0; point < grid.length; point += 2) {
		var pt = getXY(grid[point], grid[point + 1]);
		sGrid +=
			'<use onmousemove="setActive(' +
			ptno +
			')" xlink:href="#' +
			(ptno == active ? "crossFilled" : "cross") +
			'" x="' +
			pt.x +
			'" y="' +
			pt.y +
			'"  />\n';
		path += (ptno === 1 ? "L " : "") + grid[point] + " " + grid[point + 1] + " ";
		ptno++;
	}
	sGrid += gridPath.replace("%path%", path);
	$log.html('&lt;path d="' + curve.html + '" &gt;');
	$grid.html(sGrid);
	$data.text(curves[currentCurve].init);
	$curve.html('<path d="' + curve.d + '" >');
}

svg.addEventListener("mousemove", handleMouseMove, false);
svg.addEventListener("touchmove", handleMouseMove, false);

document.addEventListener("keyup", function(evt) {

	switch (evt.keyCode) {
		case 37: // LEFT
			active--;
			break;
		case 39: // RIGHT
			active++;
			break;
	}
	
});


// 3. aug. 2017 Added init draw
let pseudoEvt = {
  clientX: 0,
  clientY: 0,
  buttons: 0
}
handleMouseMove(pseudoEvt)*/