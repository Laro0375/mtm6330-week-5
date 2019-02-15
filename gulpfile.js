const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

gulp.task('sass', function () {
  const plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    cssnano()
  ]
  return gulp
    .src('scss/**/*.scss') // source of any sass files
    .pipe(sass()) // run the sass compiler on the source iterable.filter((item) => {
    .pipe(gulp.dest('css')) // destination for the compiled css files
    .pipe(postcss(plugins)) // apply the PostCSS plugins
    .pipe(gulp.dest('./css/min')) // path to output the minified css file
    .pipe(browserSync.stream()) // run the browsersync stream
})

// Define the default task
gulp.task('default', function () {
  // initialize browserSync on the current folder
  browserSync.init({ server: './' })
  // watch for changes to any files in scss folder and its sub folders and with .scss extension, run the sass task when a change is found
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  // watch for changes on any .html file and reload the browser on changes
  gulp.watch('*.html').on('change', browserSync.reload)

})
