/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.

function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var itemsSelectEl = document.getElementById('items');
  for (var i =0; i < Product.allProducts.length; i++) {
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    itemsSelectEl.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var itemsSelectEl = document.getElementById('items');
  var itemPicked = itemsSelectEl.value;
  // TODO: get the quantity
  var qtySelectEl = document.getElementById('quantity');
  var qty = qtySelectEl.value;
  // TODO: using those, add one item to the Cart
  cart.addItem(itemPicked, qty);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var itemCountEl = document.getElementById('itemCount');
  itemCountEl.innerHTML = ''
  itemCountEl.appendChild(document.createTextNode(cart.items.length));
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var olEl = document.createElement('ol');

  for(var i = 0; i < cart.items.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = cart.items[i].product + ' ' + cart.items[i].quantity;
    liEl.appendChild(generateDeleteButton(cart.items[i].product));
    olEl.appendChild(liEl);
  }
  
  var cartContentEl = document.getElementById('cartContents');
  cartContentEl.innerHTML = '';
  cartContentEl.appendChild(olEl);
}

function generateDeleteButton(itemName) {
  var buttonEl = document.createElement('button');
  buttonEl.textContent = 'X';
  buttonEl.addEventListener('click', function (event) {
    cart.removeItem(itemName);
    updateCartPreview();
    updateCounter();
  });
  return buttonEl;
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
