const express =require('express')
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const controller =require('./controllers')
require('dotenv').config()
///creating express app

const PORT =process.env.PORT||3000
const app= express()

///parsing application/json
app.use(bodyParser.json())
//parsing application/x-form-urlencoded//
app.use(bodyParser.urlencoded({extended:true}))

//////connecting mongoose//

mongoose.connect(process.env.MONGO_URL)
.then(con=>console.log('database connection established...')).catch(err=>{
                              
    console.log('couldnot connect to db')
})


/////get
app.get('/',function(req,res){
    res.send('hello there')
})

///post api//

app.post('/create',function(req,res){
    controller.createNote(req,res)
})

////findallnotes
app.get('/notes',function(req,res){
    controller.findAllNotes(req,res)
})

///findnotes by id//
app.get('/note/:id',function(req,res){
    controller.findNotes(req,res)
})

//update//
app.put('/update',function(req,res){
    controller.updateNotes(req,res)
})
///delete//
app.delete('/delete/:id',function(req,res){
      controller.deleteNotes(req,res)
})
app.listen(PORT,()=>{
    console.log('server is running on port ',`${PORT}`)
})