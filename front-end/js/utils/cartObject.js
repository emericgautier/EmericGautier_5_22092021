
// object class
class CartObject {

// We get an existing cart or nothing at all
get products() {
    return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
}

// We create an object called shoppingCart in the localStorage with the products associated with the cart
set products(products) {
    localStorage.setItem('shoppingCart', JSON.stringify(products))
}

// We add a product to the cart.
addProduct(productObject) {
    let products = this.products 

// We check that the product is not already present in the cart, in this case 
const productAlreadyInCart = !!products[productObject._id]

if (productAlreadyInCart) {
// the quantity of the product is increased by one, otherwise 
products[productObject._id].quantity++
} else {
// we add the product to the cart, while creating a quantity
products[productObject._id] = {
    quantity: 1,
    ...productObject,
}
}
this.products = products 
}

// We update the quantity of a product in the cart
deleteProduct(productId) {
    const products = this.products
    delete products[productId]
    this.products = products
}

// We calculate the total price of the cart
getTotalPrice() {
    const products = this.products
    const totalPrice = Object.values(products).reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity) / 100
    }, 0)
    return totalPrice
}
}

// We initialize the cart
const Cart = new CartObject()