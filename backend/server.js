const path = require('path')
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
app.use('/api/users', require('./router/userRouter'))
app.use(errHandler)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.use('*', (req, res)=>res.sendFile(path.resolve(__dirname, '../','frontend','build','index.html')))
}

app.listen(port, ()=>console.log(`Server running on port: ${port}`))