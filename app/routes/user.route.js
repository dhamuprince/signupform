module.exports = (app) => {
  const notes = require('../controller/user.controller');

  // Create a new Note
  app.post('/users', notes.create);
  // Retrieve all Notes
  app.get('/users', notes.findAll);
   // Retrieve a single Note with noteId
   app.get('/users/:noteId', notes.findOne);

   app.put('/users/:noteId', notes.update);

   // Delete a Note with noteId
   app.delete('/users/:noteId', notes.delete);


   app.get('/api/fileupload', notes.FileAll);

   app.delete('/fileupload/:noteId', notes.deleteFile);
}