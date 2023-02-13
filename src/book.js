//path
const path = require('path') //подключение библиотеки
const fs = require('fs')
const EventEmiter = require('events')

console.log('Названия файла', path.basename(__filename));
console.log('Имя дерриктории', path.dirname(__filename));
console.log('Расширение файла', path.extname(__filename));
console.log('Parse', path.parse(__filename));

// file system

//создание папки
fs.mkdir('./test', (error) => {
    if (error) {
        throw error
    }
    console.log('Папка создана');
})

//проверка файла на содержимое
fs.readFile(filePath, (error, content) => {
    if (error) {
        throw error 
    }
    console.log('content:', content);
})

//events

const emitter = new EventEmiter;
emitter.on('anything', (data) => {
    console.log('ON:anything', data);
}) //счетчик событий

emitter.emit('anything', {a:1});  // событие
