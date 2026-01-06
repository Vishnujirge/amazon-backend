const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config({ path: __dirname + '/.env' });
const connectDB = require('./config/db');


const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const cartsRouter = require('./routes/carts');
const walletsRouter = require('./routes/wallets');
const addressesRouter = require('./routes/addresses');
const usersRouter = require('./routes/users');
const wishlistsRouter = require('./routes/wishlists');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await connectDB();
    app.use('/api/products', productsRouter);
    app.use('/api/orders', ordersRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/wallets', walletsRouter);
    app.use('/api/addresses', addressesRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/wishlists', wishlistsRouter);
    const PORT = process.env.PORT || 3000;
    app.listen(3000, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();