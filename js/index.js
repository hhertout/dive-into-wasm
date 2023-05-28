import("../pkg/index.js").catch(console.error);
console.warn(`
======== Rust is now live =======
`)
import("./app/main.js").catch(err => console.error(err))
