use std::vec;

use wasm_bindgen::prelude::*;
// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
//  wasm-pack build --target web
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

struct SnakeCell(usize);
struct Snake {
    body: Vec<SnakeCell>
}

impl Snake {
    fn new(spawn_index: usize)->Snake {
        Snake {
            body: vec!(SnakeCell(spawn_index))
        }
    }
}
// This is like the `main` function, except for JavaScript.
#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new()->World {
        World {
            width: 8, 
            snake: Snake::new(10) 
        } 
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_head_idx(&self) -> usize {
        self.snake.body[0].0
    }
}
