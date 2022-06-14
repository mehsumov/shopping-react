import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
class ProductList extends Component {
  componentDidMount() {
    console.log('tetst');
    this.props.actions.getProducts();
  }
  addToCart = (product) => {
    this.props.actions.addTocart({ quantity: 1, product });
    alertify.success(product.productName + " add to cart");
  };
  render() {
    return (
      <div>
        <h3>
          Products -{" "}
          <span className="badge bg-warning">
            {this.props.currentCategory.categoryName}
          </span>
        </h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity Per Unit</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Units in Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <button
                    onClick={() => this.addToCart(product)}
                    className="btn btn-warning"
                  >
                    Add
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
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addTocart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
