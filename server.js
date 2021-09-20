var express = require('express');
var app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get('/', function(req, res){
    user = "Tani"
    res.render("index", {user: user});
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})