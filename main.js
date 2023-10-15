import { PIECES, block_zise, board_heigth, board_width, eventMuvement } from './const.js'
import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const $score = document.getElementById('score')
const $record = document.getElementById('record')



canvas.width = block_zise * board_width
canvas.height = block_zise * board_heigth

context.scale(block_zise, block_zise)

const map = createMap(board_width, board_heigth)

function createMap(width, height) {
  return Array(height).fill().map(()=> Array(width).fill(0))
}

let score = 0
let record = 0

localStorage.setItem('record', record)

// create the piece
const piece = {
  position: {x: 6, y: 2},

  shape: [
    [1, 1],
    [1, 1]
  ]

}

// call pieces
PIECES

let dropCounter = 0 
let lasTime = 0

function upDate(time = 0) {

  const deltaTime = time - lasTime
  lasTime = time 

  dropCounter += deltaTime

  if(dropCounter > 1000) {
    piece.position.y++
    dropCounter = 0

    if(colitions()){
      piece.position.y--
      solidifyPieces()
      removeRows()
    }
  }

  Draw()

  window.requestAnimationFrame(upDate)
}

function Draw() {
  // paitn the canvas
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  // paint the piece and pieces solids
  map.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1){
        context.fillStyle = 'yellow'
        context.fillRect(x, y, 1, 1)
      }
    })
  })
  
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        context.fillStyle = 'red'
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })

  $score.innerHTML = score
  $record.innerHTML = localStorage.getItem('record')

}


// pieces muvement
document.addEventListener('keydown', event => {
  if(event.key === eventMuvement.Left){
     piece.position.x--
     if(colitions()) {
        piece.position.x++
     }
    }
  if(event.key === eventMuvement.Rigth){
     piece.position.x++
      if(colitions()) {
        piece.position.x--
     }
    }
  if(event.key === eventMuvement.Down){
     piece.position.y++
     if(colitions()) {
        piece.position.y--
        solidifyPieces()
        removeRows()
     }
    }
    if(event.key === eventMuvement.Rotate){
      const rotate = []

      for(let i = 0; i < piece.shape[0].length; i++){
          const row = []
          for(let j = piece.shape.length - 1; j >= 0; j--) {
              row.push(piece.shape[j][i])
          }
        rotate.push(row)
      }

      const previousShape = piece.shape
      piece.shape = rotate
      if(colitions()){
          piece.shape = previousShape
      }
    }
})

// pieces muvement for mobile

document.getElementById('left').addEventListener('click', () => {
  piece.position.x--
  if(colitions()) {
      piece.position.x++
  }
})

document.getElementById('right').addEventListener('click', () => {
  piece.position.x++
    if(colitions()) {
      piece.position.x--
  }
})

document.getElementById('down').addEventListener('click', () => {
  piece.position.y++
  if(colitions()) {
    piece.position.y--
    solidifyPieces()
    removeRows()
 }
})

document.getElementById('rotate').addEventListener('click', () => {
  const rotate = []

    for(let i = 0; i < piece.shape[0].length; i++){
        const row = []
        for(let j = piece.shape.length - 1; j >= 0; j--) {
            row.push(piece.shape[j][i])
        }
      rotate.push(row)
    }

    const previousShape = piece.shape
    piece.shape = rotate
    if(colitions()){
        piece.shape = previousShape
    }
})

// colitions
function colitions() {
  return piece.shape.find((row, y) =>{
    return row.find((value, x) => {
      return(
        value !== 0 && 
        map[ y + piece.position.y]?.[ x + piece.position.x] !== 0
      )
    })
  })
}

// solid pieces
function solidifyPieces() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        map[ y + piece.position.y][ x + piece.position.x ] = 1
      }
    })
  })

  piece.position.x = 6
  piece.position.y = 2

  // random pieces
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]

  if(colitions()){
    window.alert('Perdiste!!')
    map.forEach((row) => row.fill(0))

    if(score > record){
      record = score
      localStorage.setItem('record', record)
    }

    score = 0
  }
  
}

// remove row
function removeRows() {
  const rowsToRemove = []

    map.forEach((row, y) => {
        if(row.every(value => value === 1)){
            rowsToRemove.push(y)
        }
    })

    rowsToRemove.forEach(y => {
        map.splice(y, 1)
        const newRow = Array(board_width).fill(0)
        map.unshift(newRow)
        score += 10
    })

}

const startGame = document.querySelector('section')

startGame.addEventListener('click', () => {

  upDate()

  startGame.remove()

})
