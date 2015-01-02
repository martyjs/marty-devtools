module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    browserify: {
      debug: true,
      transform: ['reactify', 'envify']
    },
    files: [
      'blink/Source/devtools/front_end/inspector.js',
      'blink/Source/devtools/front_end/Object.js',
      'blink/Source/devtools/front_end/View.js',
      'app/**.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'app/*.js': ['browserify'],
      'test/**/*.js': ['browserify'],
      'app/*[!chrome]/**/*.js': ['browserify']
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