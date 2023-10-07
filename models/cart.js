const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Cart {
  static addProduct(id, productPrice){
    //Fetch the existing state of the cart
    fs.readFile(p, (err, fileContent) => {
        let cart = {products: [], totalPrice: 0};
        if (!err) {
          cart = JSON.parse(fileContent);
        }
        //Analyse the cart => find existing product

        const existingProductIndex = cart.products.find(prod => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        console.log(existingProduct);
        let updatedProduct;
        //add new product to cart/or increase the quentity
        if(existingProduct){
            updatedProduct = {...existingProduct};
            updatedProduct.quantity = updatedProduct.quantity + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
            console.log(updatedProduct);
        }
        else{
            updatedProduct = {id: id, quantity: 1};
            cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + productPrice;
        fs.writeFile(p, JSON.stringify(cart), (err)=>{
            console.log(err);
        })
      });

    

    
  }

//   save() {
//     this.id = Math.random().toString();
//     getProductsFromFile(products => {
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), err => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }

//   static findById(id, cb) {
//     getProductsFromFile(products => {
//       const product = products.find(p => p.id === id);
//       cb(product);
//     });
//   }
};
