/*global module */
/*global require */
(function () {
  'use strict';
  module.exports = function (grunt) {
    // require time-grunt at the top and pass in the grunt instance
    // it will measure how long things take for performance
    //testing
    require('time-grunt')(grunt);
    // load-grunt will read the package file and automatically
    // load all our packages configured there.
    // Yay for laziness
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

      // SASS RELATED TASKS
      // Converts all the files under scss/ ending with .scss
      // into the equivalent css file on the css/ directory
      sass: {
        dev: {
          options: {
            style: 'expanded'
          },
          files: [ {
            expand: true,
            cwd: '.',
            src: [
              'vfx/*.scss',
              'typography/*.scss',
              'code/*.scss',
              'columns/*.scss',
              'counters/*.scss',
              'fonts/*.scss',
              'maps/*.scss',
              'media-queries/*.scss',
              'mixins/*.scss'
            ],
            dest: 'css',
            ext: '.css'
          }]
        },
        production: {
          options: {
            style: 'compact'
          },
          files: [ {
            expand: true,
            cwd: 'sass',
            src: [
              'vfx/*.scss',
              'typography/*.scss',
              'code/*.scss',
              'columns/*.scss',
              'counters/*.scss',
              'fonts/*.scss',
              'maps/*.scss',
              'media-queries/*.scss',
              'mixins/*.scss'
            ],
            dest: 'css',
            ext: '.css'
          }]
        }
      },

      // This task requires the scss-lint ruby gem to be
      // installed on your system If you choose not to
      // install it, comment out this task and the prep-css
      // and work-lint tasks below
      //
      // I've chosen not to fail on errors or warnings.
      scsslint: {
        src: [
          'vfx/*.scss',
          'typography/*.scss',
          'code/*.scss',
          'columns/*.scss',
          'counters/*.scss',
          'fonts/*.scss',
          'maps/*.scss',
          'media-queries/*.scss',
          'mixins/*.scss'
        ],
        options: {
          force: true,
          colorizeOutput: true
        }
      },

      sassdoc: {
        all: {
          src: [
            'vfx/*.scss',
            'typography/*.scss',
            'code/*.scss',
            'columns/*.scss',
            'counters/*.scss',
            'fonts/*.scss',
            'maps/*.scss',
            'media-queries/*.scss',
            'mixins/*.scss'
          ],
          options: {
            dest: 'sassdocs',
            display: {
              access: ['public', 'private']
            }
          }
        }
      },
      // GH-PAGES TASK
      // Push the specified content into the repositories
      // gh-pages branch
      'gh-pages': {
        options: {
          message: 'Content committed from Grunt gh-pages',
          dotfiles: true
        },
        // These files will get pushed to the `
        // gh-pages` branch (the default)
        src: [ 'sassdocs/**/*' ]
      },

      // OPTIONAL TASKS //

      // Autoprefixer will check caniuse.com's database and
      // add the necessary prefixes to CSS elements as needed.
      // This saves us from doing the work manually
      autoprefixer: {
        options: {
          browsers: [ 'last 2 versions', 'ie8', 'ie9' ]
        },

        files: {
          expand: true,
          flatten: true,
          src: 'css/*.css',
          dest: 'css/*.css'
        }
      },

      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            ext: '.min.css'
          }]
        }
      }
    });
    // closes initConfig

    // CUSTOM TASKS
    // Usually a combination of one or more tasks defined above

    grunt.task.registerTask(
      'default',
      [ 'scsslint', 'sassdoc', 'gh-pages' ]
    );

    grunt.task.registerTask(
      'lint',
      [ 'scsslint' ]
    );

    // The following tasks are optional
    // Convert SCSS to CSS for comparison, test
    grunt.task.registerTask(
      'convert',
      [ 'sass:dev' ]
    );

    // If we choose not to manually prefix rules. Then make sure you run autoprefixer
    // to add prefixes where appropriate
    grunt.task.registerTask(
      'post-process',
      [ 'autoprefixer', 'cssmin' ]
    );

    // Run everything
    grunt.task.registerTask(
      'full',
      [ 'scsslint', 'sassdoc', 'gh-pages', 'sass-dev', 'autoprefixer' ]
    );

  };
  // closes module.exports
}
());
// closes the use strict function
