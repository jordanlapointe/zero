// Load plugins
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload');

// File locations
var paths = {
	scripts: {
		src:  'assets/scripts/**/*.js',
		dest: 'app/assets-compiled/scripts/'
	},
	styles: {
		src:  'assets/styles/**/*.scss',
		dest: 'app/assets-compiled/styles/'
	},
	images: {
		src:  'assets/images/**/*',
		dest: 'app/assets-compiled/images/'
	}
};

// Styles task
gulp.task('styles', function() {
  return gulp.src(paths.styles.src)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({
    	suffix: '.min'	
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(livereload())
    .pipe(notify({
    	message: 'Styles task complete.'
    }));
});

// Scripts task
gulp.task('scripts', function() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({
    	suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({
    	message: 'Scripts task complete'
    }));
});

// Images task
gulp.task('images', function() {
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin({
    	optimizationLevel: 3,
    	progressive: true,
    	interlaced: true
    })))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({
    	message: 'Images task complete'
    }));
});

// Clean task
gulp.task('clean', function() {
  return gulp.src([
    paths.scripts.dest,
    paths.styles.dest,
    paths.images.dest
  ], {read: false})
    .pipe(clean());
});

// Watch task
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(paths.styles.src, ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts.src, ['scripts']);

  // Watch image files
  gulp.watch(paths.images.src, ['images']);

});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'watch');
});
