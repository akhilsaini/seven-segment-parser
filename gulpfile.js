var gulp = require('gulp');
var jscs = require('gulp-jscs');
var run = require('gulp-run');

gulp.task('test-cases', function () {
	return run('npm test').exec() 
		.pipe(gulp.dest('output'))
	;
});

gulp.task('basic-load-test', function () {
	return run("ab -n 100 -c 10 http://localhost:8081/api/service/marco-polo?to=28").exec() // prints "Hello World\n". 
		.pipe(gulp.dest('output'))
	;
});
gulp.task('default-load-test', function () {
	return run("ab -n 100 -c 10 http://localhost:8081/api/service/marco-polo").exec() // prints "Hello World\n". 
		.pipe(gulp.dest('output'))
	;
});
gulp.task('extensive-load-test', function () {
	return run("ab -n 100 -c 10 http://localhost:8081/api/service/marco-polo?to=1000000").exec() // prints "Hello World\n". 
		.pipe(gulp.dest('output'))
	;
});

gulp.task('default', function () {
	//gulp.start('hello-world');
	//gulp.start('test-cases');
	gulp.start('basic-load-test');
	gulp.start('default-load-test');
	gulp.start('extensive-load-test');
});

var lintFile = [
	// '!node_modules/**',
	'app/**/*.js'
];

gulp.task('lint', function () {
	return gulp.src(lintFile).pipe(jscs({
		fix: false,
		configPath: './.jscsrc'
	})).pipe(jscs.reporter());
})
