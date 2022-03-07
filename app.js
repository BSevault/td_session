const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'ma_session_super_secret_key',
    saveUninitialized: true,
    resave: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

const authRoute = require('./routes/auth');
app.use('/api', authRoute);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

module.exports = app;
