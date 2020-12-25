const User = require('../models/user.model');
const FileUp = require('../models/Files');


// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if(!req.body) {
      return res.status(400).send({
          message: "User data can not be empty"
      });
  }

  // Create a Note
  const note = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age:req.body.age,
      dob:req.body.dob,
      email:req.body.email
  });

  // Save Note in the database
  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Note."
      });
  });
};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  User.find()
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
  User.findById(req.params.noteId)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });            
      }
      res.send(note);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving note with id " + req.params.noteId
      });
  });
};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body) {
      return res.status(400).send({
          message: "Note content can not be empty"
      });
  }

// Find note and update it with the request body
User.findByIdAndUpdate(req.params.noteId, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age:req.body.age,
    dob:req.body.dob,
    email:req.body.email
}, {returnOriginal: false})
.then(note => {
  if(!note) {
      return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
      });
  }
  res.send(note);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
      });                
  }
  return res.status(500).send({
      message: "Error updating note with id " + req.params.noteId
  });
});
};



// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.noteId)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });
      }
      res.send({message: "Note deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.noteId
          });                
      }
      return res.status(500).send({
          message: "Could not delete note with id " + req.params.noteId
      });
  });
};



// Retrieve and return all notes from the database.
exports.FileAll = (req, res) => {
    FileUp.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  };


  // Delete a note with the specified noteId in the request
exports.deleteFile = (req, res) => {
    FileUp.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
  };
  