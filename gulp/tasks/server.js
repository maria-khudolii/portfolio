'use strict';

const { task } = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('../config');

const server = (done) => {
  browserSync.init({
    watch: true,
    server: config.dest.root,
    // tunnel: true,
    // reloadDelay: 500,
    port: 3000,
    open: true,
    ui: {
      port: 3001,
    },
    codeSync: true,
  });

  done();
}

const reload = (done) => {
  browserSync.reload();
  done();
}

const streamToBrowser = (done) => {
  browserSync.stream({once: true});
  done();
}

exports.reloadServer = reload
exports.streamToBrowser = streamToBrowser
exports.default = task(server);
