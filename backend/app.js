
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const Models = require('./models');
const HttpError = require('./error')
const app = express();

app.use(bodyParser.json());

app.use('/userapi', userRoutes);

/* Whenever none of the above route matches, no response will be sent.hence this middleware is called to handle the missing route */
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

/* Special Middleware : Gets called if any error is thrown/forwareded to from the previous middleware */
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

Models.sequelize.sync({
    force : false,
    logging : console.log
}).then(function () {
    console.log('Connected to Database')
    app.listen(8001,() => {
            const port = '8001'
            console.log('runing...')
    })
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

