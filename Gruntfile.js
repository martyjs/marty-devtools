module.exports = function (grunt) {
  var watchOptions = {
     watch: true,
    debug: true
  };

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', 'concurrent:watch');
  grunt.registerTask('build-watch', 'concurrent:watch');
  grunt.registerTask('build', ['browserify:releasePanel', 'browserify:releaseDevtools', 'browserify:releaseBackground']);

  grunt.initConfig({
    concurrent: {
      watch: {
        tasks: [
          'browserify:watchPanel',
          'browserify:watchServer',
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
      releaseServer: serverOptions(),
      releaseDevtools: devtoolsOptions(),
      releaseBackground: backgroundOptions(),
      watchPanel: panelOptions(watchOptions),
      watchServer: serverOptions(watchOptions),
      watchDevtools: devtoolsOptions(watchOptions),
      watchBackground: backgroundOptions(watchOptions),
    }
  });

  function serverOptions(options) {
    return browserifyOptions('./app/server/client/index.js', './dist/server.js', options);
  }

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
        watch: !!options.watch,
        keepAlive: !!options.watch,
        browserifyOptions: {
          debug: !!options.debug
        }
      }
    };
  }
};