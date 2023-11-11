
const User = require("../model/user");
const bcrypt = require('bcrypt');
const regExPassword = /^(?=.*[@*.#])[A-Za-z0-9@*.#]*$/;

module.exports = (app) => {
    
    app.get('/api/user/getAll', function (req, res) {

        User.find(function (err, user) {

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

    app.post('/api/user/create', async function (req, res) {

        var {full_name, email, password} = new User(req.body);

        if(!password.match(regExPassword)){
            res.send("Password format is invalid");
            return;
        }

        if(password.length<5 || password.length>50){
            res.send("Password length is not valid");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new User({
            full_name,
            email,
            password:hashedPassword,
          });

          newUser.save(function (err, n) {
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

    app.put('/api/user/edit/:email', async (req, res) => {
        try {
            const email = req.params.email;
            const user = req.body;

            const check = await User.findOne({email:email});

            if(!check){
                return res.status(404).json({ message: 'No such email found!!' });
            }
        
            if(user.email != email){
                return res.status(404).json({ message: 'Email field cannot be updated!!' });
                
            }

            const userUpdation = await User.findOneAndUpdate(
            { email },
            user
            );
        
            if (!userUpdation) {
            return res.status(404).json({ message: 'No such email found' });
            }
        
            return res.json(user);
        } catch (error) {
            console.error('Error updating User:', error.message);
            return res.status(500).json({ message: 'User cannot be updated' });
        }
        });


}