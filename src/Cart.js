const express = require('express');
const router = express.Router();

let cart = [];

// Add item to cart
router.post('/add', (req, res) => {
    const { itemId, quantity } = req.body;

    const existingItem = cart.find(item => item.itemId === itemId);

    if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if item exists
    } else {
        cart.push({ itemId, quantity });
    }

    res.status(201).json({ message: 'Item added to cart', cart });
});

// View cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Update item quantity in cart
router.put('/update', (req, res) => {
    const { itemId, quantity } = req.body;
    const existingItem = cart.find(item => item.itemId === itemId);

    if (existingItem) {
        existingItem.quantity = quantity;
        res.json({ message: 'Item quantity updated', cart });
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
});

// Remove item from cart
router.delete('/remove/:itemId', (req, res) => {
    const { itemId } = req.params;
    cart = cart.filter(item => item.itemId !== itemId);

    res.json({ message: 'Item removed from cart', cart });
});

// Clear cart
router.delete('/clear', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared', cart });
});

module.exports = router;