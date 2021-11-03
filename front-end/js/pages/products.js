;(async() => {
    const productId = getProductId()
    let productData = await request.get(`http://localhost:3000/api/teddies/${productId}`)
    displayProductData(productData)
})()

// get the product ID from the url
function getProductId() {
    return new URL(window.location.href).searchParams.get('id')
}

// Display product information on the page
function displayProductData(product) {
    const name = document.getElementById('product__name')
    const image = document.getElementById('product__image')
    const price = document.getElementById('product__price')
    const button = document.getElementById('product__button')

    name.textContent = `Ours en peluche ${product.name}`
    image.src = product.imageUrl
    image.alt = product.name 
    price.textContent = `${product.price / 100}.00 €`
    button.textContent = `Ajouter au panier`

    product.colors.forEach((color) => {
        buildColors(color)
    })

    button.onclick = (event) => {
        event.preventDefault()
        Cart.addProduct(product)
        window.location.href = `${window.location.origin}/front-end/pages/cart.html`
    }
}

// Build the custom product field
function buildColors(color) {

    const template = document.getElementById('singleColor')
    const clone = document.importNode(template.content, true)
    const option = clone.getElementById('singleColor__color')

    option.value = color
    option.label = color

    document.getElementById('color__select').appendChild(clone)

    option.removeAttribute('id')
    option.classList.add('singleColor__color')
}