var request = require('request');
require('dotenv').config();

module.get = function(userid){
    const headers = {
        "Authorization": `Bot ${process.env.TOKEN}`
    };

    const options = {
        url: `https://discord.com/api/v9/users/${userid}`,
        method: "GET",
        headers: headers,
    };

    request(options, function (error, response, body) {
        return body;
    })
};
