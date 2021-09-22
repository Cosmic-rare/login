var express = require('express');
var app = express();
const gets = require('./modules/gets.js');
const port = 3000;
require('dotenv').config()

app.set("view engine", "ejs");

app.get('/:userid/:token', function (req, res) {
    var userid = req.params.userid;
    const username = gets.getName(userid);
    console.log(username);
    res.render("index", {user: username});
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
