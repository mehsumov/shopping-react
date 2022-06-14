/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from '../../redux/actions/cartActions'
import {Link} from "react-router-dom"

class CartSummary extends Component {
  renderEmpty() {
    return (
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/">
          Empty Cart
        </a>
      </li>
    );
  }

  renderSummary() {
      let totalPrice = this.props.price.reduce((total, num) => {
        return total + num;
      });
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Cart - {totalPrice}$
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {this.props.cart.map((cartItem) => (
            <li key={cartItem.product.id}>
              
              <a  className="dropdown-item" href="#">
                <span onClick={()=>this.props.actions.removeFromCart(cartItem)} className="badge bg-danger me-1">x</span>
                {cartItem.product.productName} - {cartItem.quantity}
              </a>
            </li>
          ))}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/cart">
              Go to cart
            </Link>
          </li>
        </ul>
      </li>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
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

export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);
