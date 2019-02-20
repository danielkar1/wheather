const bodyParser=require('body-parser')
const express=require('express')
const path=require('path')
const app=express()
const api=require('./server/routes/api')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/Wheather-last',{useNewUrlParser: true})

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/',api)

const port=3000
app.listen(port,function(){
    console.log("runing on port 3000")
})

