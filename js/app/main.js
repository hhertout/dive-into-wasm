import { World } from "../../pkg";

const canvas = document.getElementById("wasm")
const world = World.new()

const ctx = canvas.getContext("2d")

const WORLD_WIDTH = world.width()
const CELL_SIZE = 15

canvas.height = WORLD_WIDTH * CELL_SIZE
canvas.width = WORLD_WIDTH * CELL_SIZE
const drawWorld = () => {
    ctx.beginPath()

    for (let x = 0; x < WORLD_WIDTH + 1; x++) {
        ctx.moveTo(CELL_SIZE * x, 0)
        ctx.lineTo(CELL_SIZE * x, WORLD_WIDTH * CELL_SIZE)
    }
    for (let y = 0; y < WORLD_WIDTH + 1; y++) {
        ctx.moveTo(0, CELL_SIZE * y)
        ctx.lineTo(WORLD_WIDTH * CELL_SIZE, CELL_SIZE * y)
    }
    ctx.stroke()
}

const drawSnake = () => {
    const snakeIdx = world.snake_head_idx();
    const x = snakeIdx % WORLD_WIDTH
    const y = Math.floor(snakeIdx / WORLD_WIDTH)

    ctx.beginPath()
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    ctx.stroke()
}

drawWorld()
drawSnake()