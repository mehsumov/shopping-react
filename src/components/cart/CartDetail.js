import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions'

class CartDetail extends Component {
    render() {
        let totalPrice =()=>{
            if(this.props.price.length>0){
                return this.props.price.reduce((total,num)=>{
               return total+num
           })
            }else{
                return 0
            }
        
        } 
        return (
          <div>
            <span className="badge bg-success d-block w-100 fs-3">{totalPrice()}$</span>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map((cartItem) => (
                  <tr key={cartItem.product.id}>
                    <th>{cartItem.product.id}</th>
                    <td>{cartItem.product.productName}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{cartItem.product.unitPrice}</td>
                    <td>
                      <button
                        onClick={() =>
                          this.props.actions.removeFromCart(cartItem)
                        }
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
}


function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    price: state.priceReducer,
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions:{
      removeFromCart:bindActionCreators(cartActions.removeFromCart,dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
