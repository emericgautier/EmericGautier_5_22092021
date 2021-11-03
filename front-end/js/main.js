// API Resquest
(async () => {
  let products = await request.get('http://localhost:3000/api/teddies') 
  displayProducts(products)
})()

// Products display
function displayProducts(products) {
  products.forEach((product) => {
    buildProducts(product)
  })
}

// Unit products display
function buildProducts(product) {
  
  // Shortcut
  const singProd = 'singleProduct__' 

  // Template selection
  const template = document.getElementById('singleProduct')
  const clone = document.importNode(template.content, true)

  // shortcuts to item pointers 
  const link = clone.getElementById(singProd + 'link')
  const description = clone.getElementById(singProd + 'description')
  const price = clone.getElementById(singProd + 'price')
  const name = clone.getElementById(singProd + 'name')
  const image = clone.getElementById(singProd + 'image')
  
  // Definition of the content of each element 
  link.href = `/front-end/pages/product.html?id=${product._id}`
  description.textContent = product.description
  price.textContent = `${product.price / 100}.00 €`
  name.textContent = product.name
  image.src = product.imageUrl
  image.alt = product.name 

  document.getElementById('products').appendChild(clone)

  /* Remove ids and add classes, to avoid W3C errors for multiple use of an id */
  link.removeAttribute('id')
  link.classList.add(singProd + 'link')
  description.removeAttribute('id')
  description.classList.add(singProd + 'description')
  price.removeAttribute('id')
  price.classList.add(singProd + 'price')
  name.removeAttribute('id')
  name.classList.add(singProd + 'name')
  image.removeAttribute('id')
  image.classList.add(singProd + 'image')

}
