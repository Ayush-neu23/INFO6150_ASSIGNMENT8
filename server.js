const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const routes = require('./app/routes/routes')


// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Web_Design_Assignment_8', { useNewUrlParser: true }); 
mongoose.connection
.once("open", () => console.log('Connected')) 
.on("error", error => {
    console.log("MongoDB Error: " + error);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

routes(app);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})