import express from 'express'
import fs from 'fs'

export const keyListRouter = express()

const rawData = fs.readFileSync('data.json');
const lists = JSON.parse(rawData).lists

keyListRouter.get('/api/keyList', (req, res) => {
    res.send(lists);
});
