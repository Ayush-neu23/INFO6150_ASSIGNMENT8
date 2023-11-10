
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

    // app.js (continued)
    app.delete('/api/user/delete', async (req, res) => {
        try {
        const { email } = req.body;

        const user = await User.findOneAndDelete({ email });

        if (!user) {
        res.status(404).json({ message: 'Email not found' });
        } 
        else {
            res.send(user);
        }
        } catch (error) {
        console.error(error);
        res.send(error.message);
        }
        });


}