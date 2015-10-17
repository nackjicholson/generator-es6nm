# generator-es6nm [![Build Status](https://travis-ci.org/nackjicholson/generator-es6nm.svg?branch=master)](https://travis-ci.org/nackjicholson/generator-es6nm)

> Scaffold out a node module written in ES6

![](screenshot.png)

## Example

Check out [reqo](https://github.com/CascadeEnergy/reqo). An example module built from this generator.

## Install

```
$ npm install --global generator-es6nm
```


## Usage

With [yo](https://github.com/yeoman/yo):

```
$ yo es6nm
```

## Features

### Useful Gulp Tasks for Improved ES6 Development

**Transpile to ES5 with Babel**

Transpiles the module you've written in the `es6/` directory to ES5 code and places it in the `es5/` directory.
Run this before distributing your module to npm.

`$ gulp transpile`

**Linting with Eslint**

Configured by default to use the "airbnb/base" eslint preset which provides 
a mostly sane set of rules for writing JavaScript, learn more [here](https://github.com/airbnb/javascript)

`$ gulp lint`

To set up a watcher which will lint your code anytime a file changes in the `es6` directory.

`$ gulp lint-es6`

To run a one time lint of non test code in the `es6/` directory.

`$ gulp lint-es6-test`

To run a one time lint of the test files in the `es6/test` directory.

**JavaScript Code Style Enforcement with JSCS**

`$ gulp jscs`

Analyzes your code for adherence to a [`jscs`](http://jscs.info/) code style specification. Uses the "airbnb" jscs preset.

**Tests with mocha**

`$ gulp test`

Runs a test of your es6 code using mocha.

`$ gulp coverage`

Does a test of your system and generates a coverage report using [`istanbul`](https://gotwarlost.github.io/istanbul/)

**Dev Mode**

`$ gulp watch`

Run a file watcher which performs linting, code style checks, and tests anytime you save a file.

## License

MIT © [Will Vaughn](http://twitter.com/nackjicholson)
