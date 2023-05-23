require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();

// Connect to MongoDB
connectDB();

// middleware for Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// midleware to parse incoming requires with JSON payloads
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Static File
app.use('/public', express.static('public'));

// routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/products', require('./routes/api/publicData'));

app.use(verifyJWT);
app.use('/cart', require('./routes/api/carts'));
app.use('/admin/users', require('./routes/api/users'));
app.use('/admin/products', require('./routes/api/products'));
app.use('/admin/order', require('./routes/api/orders'));

// listening port
const port = process.env.PORT || 3005;

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
  app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });
});