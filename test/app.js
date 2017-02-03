const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-hapi-nack:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        moduleName: 'my-new-module',
        description: 'test',
        githubUsername: 'test'
      })
      .toPromise();
  });

  it('generates expected files', function () {
    assert.file([
      '.gitignore',
      '.travis.yml',
      'lib/myNewModule.js',
      'test/myNewModule.test.js',
      'package.json',
      'README.md'
    ]);
  });
});
