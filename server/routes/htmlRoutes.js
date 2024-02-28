const path = require('path');

module.exports = (app) =>
    // Route for GET requests to the root URL ('/').
    app.get('/', (req, res) =>
        // Responds by sending the 'index.html' file located in the 'client/dist' directory.
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
    );

