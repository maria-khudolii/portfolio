'use strict';

const {task, src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const {streamToBrowser} = require('./server');
const config = require('../config');

const scssProcessing = () => {
  return src(config.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(dest(config.dest.css))
    .pipe(postcss([cssnano]))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(dest(config.dest.css));
}

const scss = () => {
  return watch(
    config.watch.scss,
    {ignoreInitial: false},
    series(scssProcessing, streamToBrowser),
  );
}

exports.default = task(scss);
