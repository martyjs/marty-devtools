module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    browserify: {
      debug: true,
      transform: ['reactify']
    },
    files: [
      'app/**.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'app/*.js': ['browserify'],
      'app/*[!chrome]/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },
    port: 9876,
    logLevel: config.LOG_INFO,
    reporters: ['spec'],
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};