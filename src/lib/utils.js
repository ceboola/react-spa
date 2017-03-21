export const partial = (fn, ...args) => fn.bind(null, ...args);

export const pipe = (f, g) => (...args) => g(f(...args));
