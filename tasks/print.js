/*
 * print-styles
 * https://github.com/saldridge/grunt-plugins
 *
 * Copyright (c) 2014 Seth Aldridge
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var CSSOM = require("cssom"),
      jsdom = require("jsdom");

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('print', 'Make external CSS styles inline for HTML print template', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      template: '',
      key_separator: ': ',
      rule_separator: '; '
    }),
    that = this;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join();

      // Setup local variables
      var css = CSSOM.parse(src),
          template = grunt.file.read(options.template),
          complete = that.async(),
          selectors = {},
          cssRules = css.cssRules,
          markup = '';

      // Loop through list of rules
      for ( var i=0; i<cssRules.length; i++ ) {
        // Setup local scope variables
        var style = cssRules[i].style,
            selectorText = cssRules[i].selectorText,
            rules = [];

        // Loop through all the styles
        for ( var j=0; j<style.length; j++ ) {
          // Add rules to an array;
          rules.push(style[j] + options.key_separator + style[style[j]]);
        }

        // Add the styles to the associated selector
        selectors[cssRules[i].selectorText] = rules.join(options.rule_separator);
      }

      jsdom.env(
        template,
        ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
          var $ = window.$,
              selector;

          for ( selector in selectors ) {
            $(selector).each(function() {
              $(this).attr('style', selectors[selector]);
            });
          }

          markup = window.document.documentElement.innerHTML;

          // Remove unused head, body, and script tag
          markup = markup.replace('<script class="jsdom" src="http://code.jquery.com/jquery.js"></script>', '');

          // Write the destination file.
          grunt.file.write(f.dest, markup);

          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');

          complete();
        }
      );

    });
  });

};
