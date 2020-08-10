require('./config/config');
require('./models/db');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const dotevn = require('dotenv')
const mongoose = require('mongoose')
const rtsIndex = require('./routes/index.router');


const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customers')
const farmerRouter = require('./routes/farmers')
const productRouter = require('./routes/products')
const ordersRouter = require('./routes/orders')

const customerOnly = require('./middlewears/customerOnly')

// initiation
dotevn.config() // Load environment configuration from .env file
const app = express();

// Database
const mongoOptions = { server: { socketOptions: { keepAlive: 1 } }, useNewUrlParser: true }
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017', mongoOptions)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup available APIs
app.use('/', indexRouter);
app.use('/customers', customerOnly, customerRouter);
app.use('/products', productRouter)
app.use('/farmers', farmerRouter)
app.use('/orders', ordersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
        .json(`An error occurs in our server. Please contact system administration for more information. Msg: ${err}`);
});

module.exports = app;