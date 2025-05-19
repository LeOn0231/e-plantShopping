import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array. Each item will be an object: { ...plantDetails, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // newItem is the plant object from ProductList.jsx
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // If item already exists in cart, increment its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to cart with quantity 1
        // The newItem already contains name, image, description, cost (as a number)
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // action.payload is expected to be the name of the item to remove
      const itemNameToRemove = action.payload;
      state.items = state.items.filter(item => item.name !== itemNameToRemove);
    },
    updateQuantity: (state, action) => {
      // action.payload is expected to be an object: { name: string, quantity: number }
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        if (quantity <= 0) {
          // If new quantity is 0 or less, remove the item from the cart
          state.items = state.items.filter(item => item.name !== name);
        } else {
          // Otherwise, update the quantity
          itemToUpdate.quantity = quantity;
        }
      }
      // If itemToUpdate is not found, nothing happens, which is fine.
    },
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default
export default CartSlice.reducer;