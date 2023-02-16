const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{
    id: Number,
    name: String,
    value: String,
  }],
  styles: [{
    id: Number,
    name: String,
    original_price: String,
    sale_price: String,
    is_default: Boolean,
    photos: [{
      id: Number,
      thumbnail_url: String,
      url: String,
    }],
    skus: [{
      id: Number,
      quantity: Number,
      size: String,
    }],
  }],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
