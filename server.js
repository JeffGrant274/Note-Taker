const express = require ('express')
const path = require ('path')
const fs = require ('fs')
const app = express ()

var PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT)
})