import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "Add_item") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items]; //We copy the array to avoid changing the original state directly.

    if (existingCartItemIndex > -1) {
      //The variable existingCartItemIndex holds the position of the item in the array. If it’s -1, it means the item is NOT found
      const existingCartItem = state.items[existingCartItemIndex]; //This gets the existing item from the cart.
      const updatedItem = {
        ...existingCartItem, //makes copy of whole object without modifying the original using spread operator
        quantity: existingCartItem.quantity + 1, //This makes a copy of that item and increases its quantity by 1.
      };

      updatedItems[existingCartItemIndex] = updatedItem; //This updates that item in the updatedItems array.
    } else {
      updatedItems.push({ ...action.item, quantity: 1 }); //This takes the new item (from the action) and adds it to the array with quantity: 1.
    }

    return { ...state, items: updatedItems }; //This returns the updated state with the new items array.
  }

  if (action.type === "remove_item") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems };
  }
  if (action.type === "clear_cart") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "Add_item", item: item });
  }

  function removeItem(id) {
    dispatch({ type: "remove_item", id });
  }
  function clearCart() {
    dispatch({ type: "clear_cart" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
