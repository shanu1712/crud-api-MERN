const mongoose=require('mongoose')

const NoteSchema =mongoose.Schema({
    title:{
        type:String,

    },
    content:{
        type:String

    },
   
    
})

module.exports = mongoose.model('Note',NoteSchema)