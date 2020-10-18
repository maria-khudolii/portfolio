'use strict';

const { registry, task, parallel, series } = require('gulp');
const HubRegistry = require('gulp-hub');

/* load some files into the registry */
const hub = new HubRegistry(['./gulp/tasks/*.js']);
/* tell gulp to use the tasks just loaded */
registry(hub);

const requireDir = require('require-dir')
const tasks = requireDir('./gulp/tasks/', {recurse: true});
const woServer = Object.keys(tasks).filter(el=> el !== 'server')

exports.default = task('start', series('server', parallel(woServer)))
