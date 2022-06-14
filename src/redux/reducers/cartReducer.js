import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            cartItem.quantity++;
            return cartItem;
            // return Object.assign({}, addedItem, {
            //   quantity: addedItem.quantity + 1,
            // });
          }
          return cartItem;
        });
        return newState;
      } else {
        // let newState = [...state]
        // newState.push(action.payload)
        // return newState;
        return [...state, { ...action.payload }];
      }
    case actionTypes.REMOVE_FROM_CART:
      var addedItem2 = state.find(
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem2.quantity > 1) {
        const newState2 = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            cartItem.quantity--;
            return cartItem;
          }
          return cartItem;
        });
        return newState2;
      } else {
        const newState3 = state.filter(
          (cartItem) => cartItem.product.id !== action.payload.product.id
        );
        return newState3;
      }

    default:
      return state;
  }
}
