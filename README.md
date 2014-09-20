# grunt-print

> Take CSS and make them inline for HTML print emails

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-print --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('print');
```

## The "print" task

### Overview
In your project's Gruntfile, add a section named `print` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  print: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.template
Type: `String`
Default value: `''`

URL to your print HTML template

#### options.key_separator
Type: `String`
Default value: `': '`

A string value that is used to separate CSS selectors from the rules (e.g. color: red).

#### options.rule_separator
Type: `String`
Default value: `'; '`

A string value that is used to separate CSS selectors from other selectors

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  print: {
    options: {
      template: 'app/templates/print.html'
    },
    files: {
      'dest/print.html': ['app/css/print.css'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.1.0 - This is the first version with limited options. CSS selectors parse an HTML template and move styles inline for HTML print templates
