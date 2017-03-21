import {partial} from './utils';

const add = (a, b) => a + b;

test('partial applies the first ahead of time', () => {
  const inc = partial(add, 1, 4);
  const result = inc(2);
  expect(result).toBe(3);
});
