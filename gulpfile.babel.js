const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

exports.default = function() {
    return src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/'));
}