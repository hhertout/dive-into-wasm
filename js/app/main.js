import { World } from "../../pkg";

const canvas = document.getElementById("wasm")
const world = World.new()

const ctx = canvas.getContext("2d")

const WORLD_WIDTH = world.width()
const CELL_SIZE = 10

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

drawWorld()