const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const session = require('express-session')
const mongoose = require('mongoose');

const { Nuxt, Builder } = require('nuxt')
require('dotenv').config()


const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const app = express();

mongoose
  .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,    useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => {
      console.log(err);
    });
app.use(session({
    secret: 'hihihehe',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use((req, res, next) => {
    var ip = req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.ip &&
        req.ip.match(/\d+\.\d+\.\d+\.\d+/) &&
        req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0] ||
        '127.0.0.1';

    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    req.session.ip = ip;
    next();
});
app.use(morgan('dev'))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser())

app.use('/api/user', require('./routes/user.js'))
app.use('/api/admin', require('./routes/admin.js'))


// We instantiate Nuxt.js with the options
var config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
app.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console
