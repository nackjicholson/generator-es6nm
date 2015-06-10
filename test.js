'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('generator', function () {
	beforeEach(function (cb) {
		var deps = ['../app'];

		helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
			if (err) {
				cb(err);
				return;
			}

			this.generator = helpers.createGenerator('es6nm:app', deps, null, {skipInstall: true});
			cb();
		}.bind(this));
	});

	it('generates expected files', function (cb) {
		var expected = [
			'.gitignore',
			'.jshintrc',
			'.travis.yml',
			'es6/index.js',
      'es6/test/index.js',
      'package.json',
      'README.md',
      'gulpfile.js',
      'gulp/default.js',
      'gulp/jscs.js',
      'gulp/lint.js',
      'gulp/test.js',
      'gulp/transpile.js',
      'gulp/watch.js'
		];

		helpers.mockPrompt(this.generator, {
			moduleName: 'test',
			githubUsername: 'test',
      description: 'test'
		});

		this.generator.run(function () {
			assert.file(expected);
			cb();
		});
	});
});
