
const express = require ('express')
const path = require ('path')
const fs = require ('fs')

//setting up express app
const app = express ()
var PORT = process.env.PORT || 3001;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  
  });
  
  //stores the note
  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      var id = notes[notes.length - 1].id + 1
      var nNote = { title: req.body.title, text: req.body.text, id: id }
      var aNote = notes.concat(nNote)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(aNote), function (error, data) {
        if (error) {
          return error
        }
        console.log(aNote)
        res.json(aNote);
      })
    })
  })
  
 //retrieves the note
  app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
      if (error) {
        return console.log(error)
      }
      console.log("This is a note", data)
      res.json(JSON.parse(data))
    })
  });

app.listen(PORT, function () {
    console.log("The app listening on PORT, " + PORT)
})