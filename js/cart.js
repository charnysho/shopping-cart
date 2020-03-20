/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tbodyEl = document.getElementsByTagName('tbody')[0];
  var tableRows = tbodyEl.getElementsByTagName('tr');
  var rowCount = tableRows.length;
  for (var x = rowCount - 1; x >= 0; x--) {
    tbodyEl.removeChild(tableRows[x]);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  var tbodyEl = document.getElementsByTagName('tbody')[0];
  for(var i = 0; i < cart.items.length; i++) {
  // TODO: Iterate over the items in the cart
  var row = document.createElement('tr');
  var itemCell1 = document.createElement('td');
  var itemCell2 = document.createElement('td');
  var itemCell3 = document.createElement('td');

  itemCell1.textContent = cart.items[i].product;
  itemCell2.textContent = cart.items[i].quantity;
  itemCell3.appendChild(generateDeleteButton(cart.items[i].product)); 
  
  row.appendChild(itemCell1);
  row.appendChild(itemCell2);
  row.appendChild(itemCell3);
  
  tbodyEl.appendChild(row);
  }
}

function generateDeleteButton(itemName) {
  var buttonEl = document.createElement('button');
  buttonEl.textContent = 'X';
  buttonEl.addEventListener('click', function (event) {
    cart.removeItem(itemName);
    clearCart();
    showCart();
  });
  return buttonEl;
}

// This will initialize the page and draw the cart on screen
renderCart();
