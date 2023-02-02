import {GlobalKeyboardListener} from "node-global-key-listener";

import express from 'express'
import robot from 'robotjs'
import fs from 'fs'
const v = new GlobalKeyboardListener();

const app = express()
const port = 3000

const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData).data

app.get('/api/:key', (req, res) => {
    res.send('Hello World, from express');
    console.log('key: ', req.params["key"])
});

v.addListener(function (e, down) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === e.name && e.state === 'UP') {
            robot.keyTap('backspace')
            robot.typeString(data[i].text)
        }
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))