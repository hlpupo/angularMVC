/**
 * Created by SeyerOpup on 10/10/2016.
 */

'use strict';
var gulp = require('gulp'),
    chmod = require('gulp-chmod'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    notify = require("gulp-notify"),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    yargs = require('yargs'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    //glob = require('glob'),
    watch = require('gulp-watch'),
    purge = require('gulp-css-purge');



//set the env var
var env = yargs.argv.env || 'dev';
console.log('Environment: ' + env);

var inputAppJS = ['js/app.module.js', 'js/app.js'];
var inputControllerJS = ['js/controllers/**.Controller.js'];
var inputDirectiveJS = ['js/directives/**.Directive.js'];
var inputServiceJS = ['js/services/**.Service.js'];
var inputFactoryJS = ['js/Factory/**.Factory.js'];
var inputFilterJS = [];

/**
 * Gulp inject
 * Here, we will inject into the layout depending on the environment
 */
var layout = 'index.html';
gulp.task('injectJS', function () {
  var inputAll = [inputAppJS, inputControllerJS, inputDirectiveJS, inputServiceJS, inputFactoryJS, inputFilterJS];
  var allJS = [];

  inputAll.forEach(function (v) {
    if (Array.isArray(v)) {
      v.forEach(function (a) {
        allJS.push(a);
      })
    } else {
      allJS.push(v);
    }
  });
  var sourcesDev = gulp.src(allJS, { read : false });
  var sourcesProd = gulp.src(['dist/js/*.js'], { read : false });
  return gulp.src(layout)
      .pipe(gulpif(env === 'dev', inject(
          sourcesDev, {
            ignorePath : '/js',
            transform : function (filepath) {
              return '<script src="js'+ filepath +'"></script>';
            }
          }
      )))
      .pipe(gulpif(env === 'prod', inject(
          sourcesProd, {
            ignorePath : '/assets',
            transform : function (filepath) {
              var str = "'assets" + filepath + "'";
              return '<script src="{{ absolute_url(asset(' + str + ')) }}"></script>';
            }
          }
      )))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.reload({ stream : true }))
      .pipe(notify({ message : 'Inject task complete' }));
});
gulp.task('inject', ['injectJS']);

gulp.task('injectAll', function () {
  gulp.start('inject');
});

/**
 * Task to compile js
 */
//output only file whi app, app.constant. app.router, app. module
gulp.task('compileJSApp', function () {
  gulp.src(inputAppJS)
      .pipe(uglify())
      .pipe(concat('appmvc.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({message: 'AppJs task complete'}));
});
gulp.task('compileApp', ['compileJSApp']);
//Controller
gulp.task('compileJSController', function () {
  gulp.src(['app/**/*.Controller.js', 'app/**/**/*.Controller.js'])
      .pipe(uglify())
      .pipe(concat('appmvc.Controller.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({message: 'Compile all Controller task complete'}));
});
gulp.task('compileController', ['compileJSController']);
//Service
gulp.task('compileJSService', function () {
  gulp.src(inputServiceJS)
      .pipe(uglify())
      .pipe(concat('appmvc.Service.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({message: 'Compile all Service task complete'}));
});
gulp.task('compileService', ['compileJSService']);
//Directive
gulp.task('compileJSDirective', function () {
  gulp.src(inputDirectiveJS)
      .pipe(uglify())
      .pipe(concat('appmvc.Directive.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({message: 'Compile all Directive task complete'}));
});
gulp.task('compileDirective', ['compileJSDirective']);
//Factory
gulp.task('compileJSFactory', function () {
  gulp.src(inputFactoryJS)
      .pipe(uglify())
      .pipe(concat('appmvc.Factory.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({message: 'Compile all Factory task complete'}));
});
gulp.task('compileFactory', ['compileJSFactory']);

gulp.task('watch', function () {
  watch (inputAppJS, function() {
    gulp.start(['compileApp', 'inject']);
  });
  gulp.watch(inputControllerJS, ['compileController']);
  watch (inputControllerJS, function() {
    gulp.start('compileJSController');
  });
  watch (inputDirectiveJS, function() {
    gulp.start(['compileDirective', 'inject']);
  });
  watch (inputServiceJS, function() {
    gulp.start(['compileService', 'inject']);
  });
  watch (inputFactoryJS, function() {
    gulp.start(['compileFactory', 'inject']);
  });
  watch (inputFilterJS, function() {
    gulp.start(['compileFilter', 'inject']);
  });

});


//Liver reload

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});
gulp.task('default', ['browser-sync','injectAll','watch']);