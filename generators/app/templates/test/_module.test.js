const assert = require('assert');
const <%= camelModuleName %> = require('../lib/<%= camelModuleName %>');

describe('lib/<%= camelModuleName %>', () => {
  it('should return bar', () => {
    const actual = <%= camelModuleName %>();
    const expected = 'bar';
    assert.equal(actual, expected, 'yep, it returned bar');
  });
});
