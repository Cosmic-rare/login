const request = require('request');
require('dotenv').config;

exports.get_user = function (userid) {
    const headers = {
        "Authorization": "Bot " + process.env.TOKEN
    }

    const options = {
        url: `https://discord.com/api/v9/users/${userid}`,
        method: "GET",
        headers: headers,
    };

    request(options, function (error, response, body) {
        console.log(options);
        return body;
    });
};

exports.getName = function (userid) {
    return userid + "aaa";
};