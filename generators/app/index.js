const chalk = require('chalk');
const camelCase = require('lodash.camelcase');
const kebabCase = require('lodash.kebabcase');
const superb = require('superb');
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = Generator.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Node Module') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What would you like to call your module?',
        default: this.appname.replace(/\s/g, '-'),
        filter: kebabCase
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your module',
        default: `My ${superb()} module`
      },
      {
        name: 'githubUsername',
        message: 'What is the GitHub username?',
        store: true,
        validate(val) {
          return val.length > 0 ? true : 'You have to provide a username';
        }
      }
    ];

    return this
      .prompt(prompts)
      .then(props => {
        props.name = this.user.git.name();
        props.email = this.user.git.email();
        props.camelModuleName = camelCase(props.moduleName);
        this.props = props;
      });
  },
  writing: {
    moduleFiles() {
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
      this.fs.copyTpl(
        this.templatePath('lib/_module.js'),
        this.destinationPath(`lib/${this.props.camelModuleName}.js`),
        this.props
      );
    },
    testFiles() {
      this.fs.copyTpl(
        this.templatePath('test/_module.test.js'),
        this.destinationPath(`test/${this.props.camelModuleName}.test.js`),
        this.props
      );
    },
    configFiles() {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }
  },
  install() {
    this.installDependencies({bower: false});
  }
});
