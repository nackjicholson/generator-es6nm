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
      console.log(props);
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },
  writing: {
    moduleFiles: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this.props
      );
      this.fs.copy(
        this.templatePath('es6/_index.js'),
        this.destinationPath('es6/index.js')
      );
      this.fs.copy(
        this.templatePath('es6/test/_index.js'),
        this.destinationPath('es6/test/index.js')
      );
    },
    configFiles: function() {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('jscsrc'),
        this.destinationPath('.jscsrc')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }
  },
	install: function() {
		this.installDependencies({bower: false});
	}
});
