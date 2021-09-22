var express = require('express');
var app = express();
const request = require('request');
const port = 3000;
require('dotenv').config()

app.set("view engine", "ejs");

app.get('/:userid/:token', function (req, res) {
    var userid = req.params.userid;

    const headers = {
        "Authorization": "Bot " + process.env.TOKEN
    }

    const options = {
        url: `https://discord.com/api/v9/users/${userid}`,
        method: "GET",
        headers: { "Authorization": "Bot " + process.env.TOKEN },
    };
    console.log("1")
    request(options, function (err, response, body) {
        console.log("2")
        username = JSON.parse(body).username;
    })
    console.log("3")
    res.render("index", { user: username });
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
