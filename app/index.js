'use strict';
var chalk = require('chalk');
var superb = require('superb');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ES6 Module') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What would you like to call your es6 module?',
        default: this.appname.replace(/\s/g, '-'),
        filter: function(val) {
          return _s.slugify(val);
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your module',
        default: 'My ' + superb() + ' module.'
      },
      {
        name: 'githubUsername',
        message: 'What is the GitHub username?',
        store: true,
        validate: function(val) {
          return val.length > 0 ? true : 'You have to provide a username';
        }
      }
    ];

    this.prompt(prompts, function (props) {
      props.name = this.user.git.name();
      props.email = this.user.git.email();
      props.camelModuleName = _s.camelize(props.moduleName);
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },
  writing: {
    moduleFiles: function() {
      this.template('_package.json', 'package.json', this.props);
      this.template('_README.md', 'README.md', this.props);
      this.directory('es6', 'es6');
    },
    configFiles: function() {
      this.copy('gitignore', '.gitignore');
      this.copy('jscsrc', '.jscsrc');
      this.copy('eslintrc', '.eslintrc');
      this.copy('travis.yml', '.travis.yml');
    },
    gulpFiles: function() {
      this.copy('gulpfile.js', 'gulpfile.js');
      this.directory('gulp', 'gulp');
    }
  },
	install: function() {
		this.installDependencies({bower: false});
	}
});
