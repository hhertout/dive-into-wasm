use wasm_bindgen::prelude::*;
// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
//  wasm-pack build --target web
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


// This is like the `main` function, except for JavaScript.
#[wasm_bindgen]
pub struct World {
    width: usize
}

#[wasm_bindgen]
impl World {
    pub fn new()->World {
        World { width: 16 }
    }

    pub fn width(&self) -> usize {
        self.width
    }
}
