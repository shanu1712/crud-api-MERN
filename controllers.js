const Note =require('./Note')
function createNote(req,res){
   // res.send('creating note')
   if(!req.body.content){
    return res.status(400).json({
        message:'invalid data'
    })
   }
   ///create a note///
   const note= new Note({
    title:req.body.title||"untitled notes",
    content:req.body.content

   })  
   //save to database//
   note.save().then(function(data){
    res.json(data)
   }).catch(function(err){
      console.log("error while saving",err)
      res.status(500).json({
        message:"some error"
      })
   })
}

function findAllNotes(req,res){
   // res.send('find all notes')
   Note.find().then(function(data){
    res.json(data)
   }).catch(function(err){
    console.log('error in finding the data',err)
    res.status(500).json({
        message:"some error occurred in finding the data"
    })
   })
}
/////// find by id//
function findNotes(req,res){
    //res.send('find notes')
    Note.findById(req.params.id).then(function(data){
        if(!data){
            return res.status(404).json({
                message:"Note not found with id"+ req.params.id
            })
        }
        res.json(data)
    }).catch(function(err){
        console.log('error while finding the data by id',err)
        res.status(500).json({
            message:err.message||"some error while finding the data"
        })
    })
}

////delete //
function deleteNotes(req,res){
   // res.send('delete notes')
   Note.findByIdAndDelete(req.params.id).then(function(data){
    if(!data){
        return res.status(404).json({
            message:"data not found "+req.params.id
        })
    }
    res.json({
        message:"data deleted successfully with id:"+req.params.id
    })
   }).catch(function(err){
    return res.status(500).json({
        message:err.message||"not able to delete"
    })
   })
}

/////update ///
function updateNotes(req,res){
    //res.send('update notes')
  const filter={"title":req.body.title}
  const newData={
    'title':req.body.title,
    'content':req.body.content
  }
  Note.findOneAndUpdate(filter,newData,{upsert:true}).then(
    function(data){
        return res.json(newData)
    }
  ).catch(function(err){
    console.log('error while updating the data',err)
    res.status(500).json({
        message:err.message||"some error occurred while updating the data"
    })
  })
}

module.exports={
    createNote,findAllNotes,findNotes,deleteNotes,updateNotes
}