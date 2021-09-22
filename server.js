var express = require('express');
var app = express();
const request = require('request');
const port = 3000;
require('dotenv').config()

app.set("view engine", "ejs");

app.get('/:userid/:token', function (req, res) {
    var userid = req.params.userid;

    const options = {
        url: `https://discord.com/api/v9/users/${userid}`,
        method: "GET",
        headers: { "Authorization": "Bot " + process.env.TOKEN },
    };
    request(options, function (err, response, body) {
        username = JSON.parse(body).username;
        res.render("index", { user: username });
    })
    
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
