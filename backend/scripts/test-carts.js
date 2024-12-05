const Carts = require('../models/carts'); // Ensure the path is correct

(async () => {
  try {
    // Replace this with a valid user ID from your `users` table
    const userId = 1;

    // Test creating a cart
    const newCart = await Carts.createCart(userId);
    console.log('New Cart:', newCart);

    // Test fetching a cart by ID
    const cart = await Carts.getCartById(newCart.id);
    console.log('Cart by ID:', cart);

    // Test fetching a cart by user ID
    const userCart = await Carts.getCartByUser(userId);
    console.log('Cart by User ID:', userCart);

    // Test updating a cart
    const updatedCart = await Carts.updateCart(newCart.id);
    console.log('Updated Cart:', updatedCart);

    // Test deleting a cart
    const deletedCart = await Carts.deleteCart(newCart.id);
    console.log('Deleted Cart:', deletedCart);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
