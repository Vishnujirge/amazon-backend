const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: require('path').join(__dirname, '.env') });
const connectDB = require('./config/db');
const Product = require('./models/product.model');

async function seed() {
  await connectDB();
  const dataPath = path.join(__dirname, '..', 'src', 'assets', 'products.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const products = JSON.parse(raw);
  if (!Array.isArray(products)) throw new Error('products.json must be an array');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });