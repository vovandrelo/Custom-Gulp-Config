/* <================================================================================================================> */
/* <============================================== НЕОБХОДИМЫЕ МОДУЛИ ==============================================> */
/* <================================================================================================================> */

// 1. Модуль Gulp - предоставляет функционал для работы с Gulp
import gulp from "gulp";

// 2. Модуль Browser-Sync - предоставляет функционал для работы с локальным сервером
import browserSync from "browser-sync";

// 3. Пользовательский модуль Path - предоставляет информацию о путях к необходимым файлам/папкам
import { path } from "./gulp/config/path.js";

/* <================================================================================================================> */
/* <============================================== НЕОБХОДИМЫЕ ЗАДАЧИ ==============================================> */
/* <================================================================================================================> */

// 1. Задача, которая копирует все файлы из папки с исходниками в папку с результатом:
import { copyFiles } from "./gulp/tasks/copyFiles.js";

// 2. Задача, которая копирует все pug-файлы из папки с исходниками в папку с результатом:
import { copyPug } from "./gulp/tasks/copyPug.js";

// 3. Задача, которая копирует все sass-файлы из папкис исходниками в папку с результатом:
import { sassProcessing } from "./gulp/tasks/sassProcessing.js";

// 4. Задача, которая копирует все js-файлы из папки с исходниками в папку с результатом:
import { jsProcessing } from "./gulp/tasks/jsProcessing.js";

// 5. Задача, которая копирует все изображения из папки с исходниками в папку с результатом:
import { copyImages } from "./gulp/tasks/copyImages.js";

// 6. Задачи, которые подключают необходимые шрифты:
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

// 7. Задача, которая удаляет все данные из папки с результатом:
import { resetBuild } from "./gulp/tasks/resetBuild.js";

// 8. Задача, которая запускает локальный сервер:
import { server } from "./gulp/tasks/server.js";


/* <================================================================================================================> */
/* <================================================= ЗАПУСК ЗАДАЧ =================================================> */
/* <================================================================================================================> */

// Настройка наблюдателя:
const watcher = () => {
    // Наблюдение за pug-файлами
    gulp.watch(path.watch.pug, { ignoreInitial: false }, copyPug).on('change', browserSync.reload);
    // Наблюдение за sass-файлами
    gulp.watch(path.watch.sass, { ignoreInitial: false }, sassProcessing).on('change', browserSync.reload);
    // Наблюдение за js-файлами
    gulp.watch(path.watch.js, { ignoreInitial: false }, jsProcessing).on('change', browserSync.reload);
    // Наблюдение за изображениями
    gulp.watch(path.watch.images, { ignoreInitial: false }, copyImages).on('change', browserSync.reload);
    // Наблюдение за иными файлами
    gulp.watch(path.watch.files, { ignoreInitial: false }, copyFiles).on('change', browserSync.reload);
};

// Работа с шрифтами:
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Настройка сценария работы Gulp:
const dev = gulp.series(resetBuild, fonts, gulp.parallel(watcher, server));

// Делаем основной сценарий общедоступной задачей:
export default dev;