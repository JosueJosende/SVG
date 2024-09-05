export const example = {
  name: 'example',
  date: '2019-08-13',
  size: 0,
  viewbox: '0 0 25 25',
  paths: [
    {
      stroke: '#292929',
      stroke_width: '0.7',
      fill: '#f2ec36',
      path: 'M4.5 6\nV6 9\nC5 15 8 20 12.5 21.5\nC17 20 20 15 20.5 9\nV6\nL12.5 3.5\nz\n'
    },
    {
      stroke: '#000000',
      stroke_width: '0.3',
      fill: '#292929',
      path: 'M11.5 6.5\nL14 7\nL12 12\nL15 10.5\nL13.5 17\nL14.5 17.4\nL12.5 19\nL11.8 16.5\nL12.8 16.8\nL13.5 12.2\nL10 14\nz'
    }
  ]
}

export const baseSvg = {
  name: `untitled`,
  date: new Date().toLocaleDateString(),
  size: '0.00',
  viewbox: '0 0 25 25',
  paths: [
    {
      stroke: '#222',
      stroke_width: '0.2',
      path: 'M0 0\n'
    }
  ]
}

export const commandsInterface = {
  KeyM: {
    points: ['xy'],
    numberCommands: 2,
    description: 'Move to x y'
  },
  KeyL: {
    points: ['xy'],
    numberCommands: 2,
    description: 'Line to x y'
  },
  KeyH: {
    points: ['x'],
    numberCommands: 1,
    description: 'Horizontal line to x'
  },
  KeyV: {
    points: ['y'],
    numberCommands: 1,
    description: 'Vertical line to y'
  },
  KeyC: {
    points: ['xy', 'xy', 'xy'],
    numberCommands: 6,
    description: 'Cubic bezier curve to x y'
  },
  KeyQ: {
    points: ['xy', 'xy'],
    numberCommands: 4,
    description: 'Quadratic bezier curve to x y'
  },
  KeyT: {
    points: ['xy'],
    numberCommands: 2,
    description: 'Shorthand quadratic bezier curve to x y'
  },
  KeyS: {
    points: ['xy', 'xy'],
    numberCommands: 4,
    description: 'Shorthand cubic bezier curve to x y'
  },
  KeyA: {
    points: ['xy', 'x', 'large-arc-flag', 'sweep-flag', 'xy'],
    numberCommands: 7,
    description: 'Elliptical arc to x y'
  },
  KeyZ: {
    points: [],
    numberCommands: 0,
    description: 'Close path'
  }
}
