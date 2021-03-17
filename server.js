// server.js
const express = require('express')

// Create Express app
const app = express()

// Settings
app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);

// A sample route
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })

// Start the Express server
app.listen('3000', () => console.log('Server running on port 3000!'))