//require('./config/config');
// require('./models/db');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config({path:'myenv.env'})

const mongoose = require('mongoose');
const fs = require('fs');
const customerRouter = require('./routes/customers')
const farmerRouter = require('./routes/farmers');
const productRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const userRouter = require('./routes/users')

const customerOnly = require('./middlewears/customerOnly');

// initiation
const app = express();
// Database
const mongoOptions = { server: { socketOptions: { keepAlive: 1 } }, useNewUrlParser: true }
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017', mongoOptions)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.disable('x-powered-by')

// log API access
app.use(logger('combined',{
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }));

app.use(cors({exposedHeaders: [process.env.AUTHENTICATION_HEADER]}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup available APIs
app.use('/', userRouter);
app.use('/customers', customerRouter);
app.use('/products', productRouter)
app.use('/farmers', farmerRouter)
app.use('/orders', ordersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;