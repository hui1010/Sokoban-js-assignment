// server.js
const express = require('express')

// Create Express app
const app = express()

// Public folder
app.use(express.static(__dirname));

// A sample route
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))