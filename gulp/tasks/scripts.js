'use strict';

const { task, src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const config = require('../config');
const { reloadServer } = require('./server');
const minify = require('gulp-minify');

const scriptsProcessing = () => {
  return src([
    // config.src.jsVendor,
    config.src.js,
  ])
    .pipe(concat('scripts.js'))
    .pipe(minify())
    .pipe(dest(config.dest.js))
}

const scripts = () => {
  return watch(
    config.watch.js,
    {ignoreInitial: false},
    series(scriptsProcessing, reloadServer)
  )
}

exports.default = task(scripts);
