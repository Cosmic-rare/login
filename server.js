var express = require('express');
var request = require('request');
var app = express();
const port = 3000;
require('dotenv').config()

const headers = {
    "Authorization": "Bot " + process.env.TOKEN
}

function get_user(userid) {
    const options = {
        url: `https://discord.com/api/v9/users/${userid}`,
        method: "GET",
        headers: headers,
    };

    request(options, function (error, response, body) {
        return body;
    });
};

app.set("view engine", "ejs");

app.get('/:userid/:token', function (req, res) {
    var userid = req.params.userid;
    const user = get_user(userid);
    res.render("index");
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
