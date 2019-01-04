var gulp = require('gulp');
sass = require('gulp-sass'); //Подключаем Sass пакет

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src(['sass/404.sass', 'sass/about.sass', 'sass/advice-product.sass', 'sass/advice.sass', 'sass/battle-comparison.sass', 'sass/battle-product.sass', 'sass/battle-subcategories.sass', 'sass/battle.sass', 'sass/bootstrap-grid-col-18.sass', 'sass/contacts.sass', 'sass/gui.sass', 'sass/main-next.sass', 'sass/rating.sass']) // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
});

gulp.task('mytask', function () {
  return gulp.src('source-files') // Выборка исходных файлов для обработки плагином
    .pipe(plugin()) // Вызов Gulp плагина для обработки файла
    .pipe(gulp.dest('folder')) // Вывод результирующего файла в папку назначения (dest - пункт назначения)
})