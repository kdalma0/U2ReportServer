var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

global.__basedir = __dirname;

let router = require('./backend/file.router.js');

// Parsers
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'public')));

// API location
app.use('/api', router);

// Send all other requests to the Angular app
app.get('/www', (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Create a Server
let server = app.listen(8080, () => {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})
