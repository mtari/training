console.log("utils.js is running");

//OR using named exports
export const square = (x) => x * x;
// const square = (x) => x * x;
export const add = (a, b) => a + b;
// const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

//OR using named exports
// export { add, square, subtract as default };

//OR using default export
export default subtract;
//OR using default export
// export default (a, b) => a - b;