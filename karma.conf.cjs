const { existsSync } = require('node:fs');

// Si no hay Chrome configurado, pruebo con Edge en Windows.
if (!process.env.CHROME_BIN && process.platform === 'win32') {
  const edge = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ].find((ruta) => existsSync(ruta));
  if (edge) process.env.CHROME_BIN = edge;
}

module.exports = function (config) {
 config.set({
   frameworks: ['jasmine', 'webpack'],
   files: [
     'src/test/**/*.spec.jsx'
   ],
   preprocessors: {
     'src/test/**/*.spec.jsx': ['webpack']
   },

   webpack: {
     mode: 'development',
     module: {
       rules: [
         {
           test: /\.jsx?$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
             },
           },
         },
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
     resolve: {
       extensions: ['.js', '.jsx'],
     },
   },
   reporters: ['progress', 'kjhtml', 'coverage'],
   coverageReporter: {
     type: 'html',
     dir: 'coverage/',
   },
   browsers: ['ChromeHeadless'],
   singleRun: true,
   restartOnFileChange: true,
   plugins: [
     'karma-jasmine',
     'karma-webpack',
     'karma-chrome-launcher',
     'karma-coverage',
     'karma-jasmine-html-reporter'
   ]
 });
};


