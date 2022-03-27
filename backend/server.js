const express = require('express');
const env = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db')

const {errHandler} = require('./middleware/errMiddleware')
const port = process.env.PORT ||3000

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.use('/api/goals', require('./router/goalsRouter'))
app.use(errHandler)

app.listen(port, ()=>console.log(`Server running on port: ${port}`))