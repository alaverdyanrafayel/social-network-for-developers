const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();

const db = require('./config/keys').db;

//body-parser middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//passport initialize

app.use(passport.initialize());

require('./config/passport')(passport);

mongoose
    .connect(db)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err));

app.use('/api/profile/', profile);
app.use('/api/posts/', posts);
app.use('/api/users/', users);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listens on port ${port}`));
