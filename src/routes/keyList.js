import express from 'express'
import fs from 'fs'

export const keyListRouter = express()

const rawData = fs.readFileSync('data.json');
const lists = JSON.parse(rawData)

keyListRouter.get('/api/keyList', (req, res) => {
    console.log('TEST')
    res.send(lists);
});
