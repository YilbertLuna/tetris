import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const block_zise = 20
const board_width = 14
const board_heigth = 25

canvas.width = block_zise * board_width
canvas.height = block_zise * board_heigth

context.scale(block_zise, block_zise)

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// create the piece
const piece = {
  position: {x: 6, y: 2},

  shape: [
    [1, 1],
    [1, 1]
  ]

}

function upDate() {

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
}


// pieces muvement
document.addEventListener('keydown', event => {
  if(event.key === 'ArrowLeft') piece.position.x--
  if(event.key === 'ArrowRight') piece.position.x++
  if(event.key === 'ArrowDown') piece.position.y++
})


upDate()