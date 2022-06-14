import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function priceReducer(state=initialState.totalPrice,action){
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            
           
        return [...state,Number(action.payload.product.unitPrice)]
        case actionTypes.REMOVE_FROM_CART:
            let prices = state;
            let index = prices.indexOf(Number(action.payload.product.unitPrice))
            prices.splice(index,1)
            console.log(prices);
    return prices
        default:
            return state
    }
}

