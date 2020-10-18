'use strict';

const { task, src, dest, series, watch } = require('gulp');
const panini = require('panini');
const { reloadServer } = require('./server');
const config = require('../config');

const htmlProcessing = () => {
  panini.refresh();
  return src(config.src.html + 'pages/**/*.{html,hbs,handlebars}')
  .pipe(panini({
    root: config.src.html + 'pages/',
    layouts: config.src.html + 'layouts/',
    pageLayouts: {
      // All pages inside src/pages/about will use the about.html layout
      'about': 'about',
    },
    partials: config.src.html + 'partials/',
    data: config.src.html + 'data/',
    helpers: config.src.html + 'helpers/',
  }))
  .pipe(dest(config.dest.root));
}

const html = () => {
  return watch(
    config.watch.html,
    {ignoreInitial: false},
    series(htmlProcessing, reloadServer),
  )
}

exports.default = task(html);
