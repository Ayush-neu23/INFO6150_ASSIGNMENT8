
const User = require("../model/user");

module.exports = (app) => {
    
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/user/getAll', function (req, res) {

        User.find(function (err, user) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err){
                console.log('Error: ' + err.message);
                res.send(err.message);
                return;
            }
            console.log('users: ', user);
            res.status(200);
            res.json(user);
        });
    });

    app.post('/api/user/create', function (req, res) {
        //console.log(req.body.message);
        var user = new User(req.body);
        user.save(function (err, n) {
            if (err){
                console.log('User saving failed: ' + err.message);
                res.send(err.message);
                return;
            }
                
            console.log('saved ' + n.message);
            res.status(201);
            res.json(n);
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
}