module.exports = function (grunt) {
  var watchOptions = {
     watch: true,
    debug: true
  };

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', 'concurrent:serve');
  grunt.registerTask('build-watch', 'concurrent:watch');
  grunt.registerTask('build', ['browserify:releasePanel', 'browserify:releaseDevtools', 'browserify:releaseBackground']);

  grunt.initConfig({
    concurrent: {
      watch: {
        tasks: [
          'browserify:watchPanel',
          'browserify:watchDevtools',
          'browserify:watchBackground'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    browserify: {
      releasePanel: panelOptions(),
      releaseDevtools: devtoolsOptions(),
      releaseBackground: backgroundOptions(),
      watchPanel: panelOptions(watchOptions),
      watchDevtools: devtoolsOptions(watchOptions),
      watchBackground: backgroundOptions(watchOptions),
    }
  });

  function panelOptions(options) {
    return browserifyOptions('./app/panel/index.js', './dist/panel.js', options);
  }

  function backgroundOptions(options) {
    return browserifyOptions('./app/background/index.js', './dist/background.js', options);
  }

  function devtoolsOptions(options) {
    return browserifyOptions('./app/devtools/index.js', './dist/devtools.js', options);
  }

  function browserifyOptions(input, output, options) {
    options || (options = {});

    return {
      src: [input],
      dest: output,
      options: {
        transform: ['reactify', 'envify'],
        watch: !!options.watch,
        keepAlive: !!options.watch,
        browserifyOptions: {
          debug: !!options.debug
        }
      }
    };
  }
};