const request = require('request');
require('dotenv').config;

var text = "";

exports.getName = function (userid) {
    const headers = {
        "Authorization": "Bot " + process.env.TOKEN
    }

    const options = {
        url: `https://discord.com/api/v9/users/${userid}`,
        method: "GET",
        headers: headers,
    };
    request(options, function (error, response, body) {
        text = body;
    });
    console.log(text);
    return text;
};