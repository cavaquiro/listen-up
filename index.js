const express = require('express');
const app = express();
const { config } = require('./config/index.js');
const usersApi = require('./routes/users')

const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body parser
app.use(express.json());
//routes
usersApi(app);
//cathch 404
app.use(notFoundHandler);

app.listen(config.port, function() {
    console.log(`Listening http:localhost:${config.port}`); // eslint-disable-line
});