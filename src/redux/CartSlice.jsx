import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Add a plant to the shopping cart
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Remove a plant completely from the shopping cart
    removeItem: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== productId
      );
    },

    // Update the quantity of a cart item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (cartItem) => cartItem.id === id
      );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.id !== id
        );
      } else {
        item.quantity = quantity;
      }
    },
  },
});

// Export the required Redux actions
export const {
  addItem,
  removeItem,
  updateQuantity,
} = cartSlice.actions;

// Export the cart reducer
export default cartSlice.reducer;