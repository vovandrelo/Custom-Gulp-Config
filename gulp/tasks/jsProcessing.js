/* <================================================================================================================> */
/* <============================================== НЕОБХОДИМЫЕ МОДУЛИ ==============================================> */
/* <================================================================================================================> */

// 1. Модуль Gulp - предоставляет функционал для работы с  Gulp:
import gulp from "gulp";

// 2. Модуль WebpackStream - предоставляет функционал для объединения JS-файлов:
import webpack from "webpack-stream";

// 3. Пользовательский модуль Path - предоставляет информацию о путях к необходимым файлам/папкам:
import { path } from "../config/path.js";


/* <================================================================================================================> */
/* <============================= РЕАЛИЗАЦИЯ ЗАДАЧИ СОЗДАНИЯ РЕЗУЛЬТИРУЮЩЕГО JS ФАЙЛА ==============================> */
/* <================================================================================================================> */

// Функция объединяет js-файлы и перемещает из папки с исходниками в папку с результатом:
export const jsProcessing = () => {
    return gulp.src(path.src.js, { sourcemap: true })   // Считываем из папки с исходниками необходимый sass-файл
        .pipe(webpack({                                 // Импортируем в него необходимые модули
            mode: "development",                        // - Режим работы WebPack
            output: { filename: "app.min.js" }          // - Имя результирующего js-файла
        }))
        .pipe(gulp.dest(path.build.js));                // Записываем результирующий js-файл в папку с результатом
};