'use strict';

const { task, src, dest, series, watch } = require('gulp');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const html = require('postcss-html');
const postcssSvg = require('postcss-svg');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');
const merge = require('merge-stream');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const config = require('../config');

const srcSVG = config.src.img + 'icons/*.svg';
const tmpDest = config.src.root + 'tmp/';
const lib = config.dest.css + 'lib/';

// See https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md
const spriteConfig = {
  shape: {
    id: {
      separator: '',
      generator: 'icon-%s',
      whitespace: '-'
    },
    spacing: {
      padding: 0
    }
  },

  mode: {
    symbol: {
      dest: '.', // Mode specific output directory
      dimensions: '', // Suffix for dimension CSS selectors
      sprite: 'icons.svg', // Sprite path and name
      bust: false,
      render: {
        scss: {
          template: config.src.helpers + 'svg/icons/sprite.scss',
          dest: '_icons.scss'
        }
      },
      example: {
        template: config.src.helpers + 'svg/icons/sprite.html',
        dest: 'sprite.html'
      }
    }
  }
};

task('icon-sprite', function () {
  return src(srcSVG)
    .pipe(svgo())
    .pipe(cheerio({
      run: function ($) {
        $('path').attr('fill', '#{$color}');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgSprite(spriteConfig))
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(dest(tmpDest));
});

task('icon-style', function() {
  const scssStream = src(tmpDest + '*.scss')
    .pipe(postcss([postcssSvg], { syntax: scss }))
    .pipe(replace('%23%7B%24color%7D', '#{$color}'))
    .pipe(dest(lib));

  const htmlStream = src(tmpDest + '*.html')
    .pipe(postcss([postcssSvg], { syntax: html }))
    .pipe(dest(tmpDest));

  return merge(scssStream, htmlStream);
});

task('svg-inline-css', series('icon-sprite', 'icon-style'));
