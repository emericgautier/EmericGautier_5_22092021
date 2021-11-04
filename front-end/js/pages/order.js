(() => {

// Get order informations
const order = getOrder()

// The order information is displayed
document.getElementById('order__id').textContent = order.orderId
document.getElementById('order__price').textContent = Cart.getTotalPrice() + '.00 €'
document.getElementById('order__name').textContent = order.contact['firstName']
document.getElementById('order__address').textContent = order.contact['address']
document.getElementById('order__mail').textContent = order.contact['email']

// Erase item from cart and order page in the localStorage
localStorage.removeItem('shoppingCart')
localStorage.removeItem('order')

})()

function getOrder() {
    return JSON.parse(localStorage.getItem('order') || '{}')
}