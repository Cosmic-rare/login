var express = require('express');
const get_user = require('./modules/get_user')
var app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get('/:userid/:token', function (req, res) {
    var userid = req.params.userid;
    const user = get_user.get(userid);
    console.log(user);
    const name = JSON.parse(user).username;
    res.render("index", { userid: name });
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
