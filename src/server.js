import {GlobalKeyboardListener} from "node-global-key-listener";

import express from 'express'
import robot from 'robotjs'
import fs from 'fs'
import open from 'open'
import ip from 'ip'
import qrcode from 'qrcode'
import { bindRouter } from "./routes/bind.js";
import { keyListRouter } from "./routes/keyList.js";
const v = new GlobalKeyboardListener();

const app = express()
const port = 3000

const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData).data

const generateQR = async text => {
    try {
        await qrcode.toFile('./assets/qr.png', text)
    } catch (err) {
        console.error(err)
    }
}
generateQR(ip.address())
open('./assets/qr.png')

app.use(bindRouter)
app.use(keyListRouter)

v.addListener(function (e, down) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].name === e.name && e.state === 'UP') {
                robot.keyTap('backspace')
                robot.typeString(data[i][j].text)
            }
        }
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))