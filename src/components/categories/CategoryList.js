import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)

  };
  render() {
    return (
      <div>
        <h3>Categories {this.props.categories.length}</h3>
        <h5>{this.props.currentCategory.categoryName}</h5>
        <ul className="list-group">
          {this.props.categories.map((category) => (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => this.selectCategory(category)}
              key={category.id}
              className={
                category.id === this.props.currentCategory.id
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
