var gulp = require('gulp');
//var jscs = require('gulp-jscs');
var run = require('gulp-run');
var async = require('async');
var runSeq = require('run-sequence');

gulp.task('test-cases', function () {
	return run('npm test').exec()
		.pipe(gulp.dest('output'));
});

/*
Marco-polo numbers from 1 to 28.
*/
gulp.task('basic-load-test', function () {
	return run("ab -n 100 -c 10 http://localhost:3000/api/service/marco-polo?to=28").exec() // prints "Hello World\n". 
		.pipe(gulp.dest('benchmark/marco-polo/basic'));
});

/*
Marco-polo numbers in default range which is 1 to 1000000.
*/
gulp.task('default-load-test', function () {
	return run("ab -n 100 -c 10 http://localhost:3000/api/service/marco-polo").exec() // prints "Hello World\n". 
		.pipe(gulp.dest('benchmark/marco-polo/default'));
});

/*
Marco-polo numbers in from 1 to 1000000.
*/
gulp.task('extensive-load-test', function () {
	return run("ab -n 100 -c 10 http://localhost:3000/api/service/marco-polo?to=1000000").exec() // prints "Hello World\n". 
		.pipe(gulp.dest('benchmark/marco-polo/extensive'));
});

gulp.task('default', function(){
  return runSeq('basic-load-test','default-load-test','extensive-load-test');
});

var lintFile = [
	// '!node_modules/**',
	'app/**/*.js'
];

// gulp.task('lint', function () {
// 	return gulp.src(lintFile).pipe(jscs({
// 		fix: false,
// 		configPath: './.jscsrc'
// 	})).pipe(jscs.reporter());
// })
