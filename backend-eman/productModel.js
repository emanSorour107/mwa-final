const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("done")
});

const productSchema = mongoose.Schema({
    _farmerId: Object,
    name: String,
    description: String,
    price: String,
    photo: String, 
    "inStock": { "type": Number }
})


const Product = mongoose.model('product', productSchema)
module.exports = Product
