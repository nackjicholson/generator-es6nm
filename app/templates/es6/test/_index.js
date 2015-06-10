import assert from 'assert';
import sum from '../index';

describe('sum', () => {
  it('should sum two numbers', () => {
    assert.equal(3, sum(1, 2));
  });
});
