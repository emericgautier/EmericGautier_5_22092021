;(() => {
    
    
    // collect the shopping cart
    const products = Cart.products
    
    // handle the display of the cart
    displayProducts(products)
    
    // handle the order form
    listeningForm()
})()

function displayProducts(products) {
    
    // For each product, we generate a new field from a template
    const productList = Object.values(products)
    productList.forEach((product) => {
        buildProducts(product)
    })
}

function buildProducts(product) {
    
    // get the template to be able to clone it
    const template = document.getElementById('singleProduct')
    const clone = document.importNode(template.content, true)
    
    // get each element of the template
    const item = clone.getElementById('item')
    const name = clone.getElementById('name')
    const qty = clone.getElementById('qty')
    const price = clone.getElementById('price')
    const del = clone.getElementById('delete')
    
    // Filling in product information
    name.textContent = product.name
    qty.textContent = product.quantity
    price.textContent = `${product.price / 100}.00 €`
    
    // handle the product deletion button
    del.onclick = (event) => {
        
        // We rule out the default behavior
        event.preventDefault()
        
        // We pass the id of the product concerned to our function
        Cart.deleteProduct(product._id)
        
        // We reload our page invisibly for the user
        document.location.reload()
        
    }
    
    // Create and insert a product in the parent 'items'
    document.getElementById('items').appendChild(clone)
    
    // Remove the IDs to avoid W3C errors and add a class if necessary
    item.removeAttribute('id')
    item.classList.add('singleProduct__container')
    name.removeAttribute('id')
    qty.removeAttribute('id')
    price.removeAttribute('id')
    del.removeAttribute('id')
    
    // Creation and insertion of the total price
    document.getElementById('total__price').textContent = Cart.getTotalPrice() + '.00€'
    
}

// handle the order form
function listeningForm() {
    
    
    // We listen to the 'onclick' event on our button
    document.getElementById('confirm').onclick = (event) => {
        event.preventDefault()
        checkOrder()
    }
}


// Function for checking and sending the command
function checkOrder() {

// We get all the textual input fields
const firstname = document.getElementById('firstname').value
const lastname = document.getElementById('lastname').value
const address = document.getElementById('address').value
const zipcode = document.getElementById('zipcode').value
const email = document.getElementById('email').value
const city = document.getElementById('city').value

// Rules made with https://regexr.com/ to control mail and postal
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/

// We check that all the fields are filled in or filled in and respect the regex rules ...
if (!(
    firstname.length > 1
    && lastname.length > 1
    && emailRegex.test(email)
    && address.length > 6
    && zipcodeRegex.test(zipcode)
    && city.length > 1
)) {


// ... Otherwise we return an error and exit our function to prevent
alert("Veuillez remplir les champs correctements avant de procéder au paiement")
return
}

// We get the products from the cart to make a table
const products = Object.values(Cart.products).map((product) => {
    return product._id
})

// We initialize a contact object for sending data
const order = {
    contact: {
        firstName: firstname,
        lastName: lastname,
        address: address + '' + zipcode,
        city: city,
        email: email,
    },
    products: products,
}

// Send request parameters
const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
}

// Send data, we get the id returned by the backend and we send it to the url
request.post(`http://localhost:3000/api/teddies/order`, requestOptions)

}




