const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000

let TO_DO_ID = 1;

let toDoList = [
    {
        id: TO_DO_ID,
        name: 'название',
        description: 'описание',
        isComplete: false,
    }
]

app.use(
    //отключение защиты от воровства с других доменов
    cors({
        origin: '*',
    }),

    // включение возможности читать тело запросов
    bodyParser.json()
);

//добовление нового
app.post('/todo/create', (req, res) => {
    const toDoFromClient = req.body;

    TO_DO_ID++;
    const newToDo = {
        ...toDoFromClient,
        id: TO_DO_ID,
        isComplete: false,
    }

    toDoList.push(newToDo);

    res.json({
        message: 'успешно добавлено',
    })
})

//смена статуса в работе/завершено
app.post('/todo/check/:id', (req, res) => {
    const findedToDoIndex = toDoList.findIndex(el => el.id === +req.params.id);

    //ошибка при указания неправельного id
    if (findedToDoIndex === -1) {
        res.status(404).json(
            {
                "message": "Задачи с таким id не сущесвтвует"
            }
        )
        return;
    } 

    const oldToDoItem = toDoList[findedToDoIndex];

    toDoList[findedToDoIndex] = {
        ...oldToDoItem,
        isComplete: !oldToDoItem.isComplete,
    };

    res.json({
        message: 'ok',
    });
})

//удаление
app.delete('/todo/delete/:id', (req, res) => {
    toDoList = toDoList.filter(el => el.id !== +req.params.id);

    res.json({
        message: 'ok',
    });
})

//список всех
app.get('/todo', (req, res) => {
    res.json(toDoList)
})

//возвращения объекта
app.get('/todo/:id', (req, res) => {
    const findedToDo = toDoList.find(el => el.id === +req.params.id);

    if (findedToDo === undefined) {
        res.status(404).json(
            {
                "message": "Задачи с таким id не сущесвтвует"
            }
        )
        return
    } 
   
    res.json(findedToDo)
})

//тест на работу сервера
app.get('/ping', (req, res) => {
    res.json(
        {
            answer: 'pong',
        }
    );
})

//запуск сервера
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})