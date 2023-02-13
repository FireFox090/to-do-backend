import express from 'express';
import  path from 'path';
// import {requestTime, logger} from 'путь'(экспортирования мидолвейр)

const app = express();

export function requestTime (req, res, next) {
    req.requestTime = Date.now();
    next();
} // задает колличествотвремени, на 3 строчке происходит экспортирование мидора

export function loger (req, res, next) {
    
}

app.use(requestTime);//регистрация мидлвейр
app.get('/', (req,res) => {
    res.sendFile (__dirname, 'путь');
})


app.get('/future', (req,res) => {
    res.sendFile (__dirname, 'путь');
}) // обработка гет запроса(создане страницы)

app.listen(3000, () => {

});


