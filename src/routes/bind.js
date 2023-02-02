import express from 'express'
import fs from 'fs'

export const bindRouter = express()

bindRouter.get('/api/bind/:key', (req, res) => {
    res.send('Hello World, from express');
    console.log('key: ', req.params["key"])
});