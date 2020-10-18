const { task, src, dest, series } = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');
const config = require('../config');

const spriteConfig = {
  shape: {
    id: {
      separator: '',
      generator: 'symbol-%s',
      whitespace: '-'
    },
    spacing: {
      padding: 0
    },
  },
  mode: {
    symbol: {
      dest: 'sprite',						      // Mode specific output directory
      dimensions: '',			            // Suffix for dimension CSS selectors
      sprite: 'sprite.svg',		        // Sprite path and name
      bust: false,					          // Cache busting (mode dependent default value)
      render: {								        // Stylesheet rendering definitions
        scss: {                       // Scss stylesheet options
          template: config.src.helpers + 'svg/symbols/sprite.scss',
          dest: '_svg_symbol_sprite.scss',
        },
      },
      example: {
        template: config.src.helpers + 'svg/symbols/sprite.html',
      },
    },
  },
};

task('svg-symbol-sprite', () => {
  return src(config.src.img + 'icons/*.svg')
    // .pipe(svgo())
    .pipe(svgSprite(spriteConfig))
    .on('error', function (error) { console.log(error); })
    .pipe(dest(config.dest.img));
});
