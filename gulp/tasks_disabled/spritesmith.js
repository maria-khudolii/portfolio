// const gulp = require('gulp');
// const notify = require('gulp-notify');
// const spritesmith = require('gulp.spritesmith');
// const imagemin = require('gulp-imagemin');
// const buffer = require('vinyl-buffer');
// const merge = require('merge-stream');
// const config = require('../config');
//
// gulp.task('sprite', () => {
//   const spriteData = gulp.src(config.src.img + '/icons/*.png').
//     pipe(spritesmith({
//       imgName: 'icons.png',
//       cssName: '_sprite.scss',
//       imgPath: '../img/icons.png',
//       cssFormat: 'scss',
//       padding: 4,
//       // algorithm: 'top-down',
//       cssTemplate: config.src.helpers + '/sprite-retina.template.mustache',
//     }));
//
//   const imgStream = spriteData.img.pipe(buffer()).
//     pipe(imagemin()).
//     pipe(gulp.dest(config.dest.img));
//
//   const cssStream = spriteData.css.pipe(gulp.dest(config.src.sass + '/lib/'));
//
//   // Return a merged stream to handle both `end` events
//   return merge(imgStream, cssStream);
// });
//
// gulp.task('sprite:watch', () => {
//   gulp.watch(config.src.img + '/icons/*.png', ['sprite']);
// });
