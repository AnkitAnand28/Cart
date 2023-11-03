import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../Context";
import axios from "axios";

function Checkout() {
  const { cartData, setCartData } = useContext(CartContext);
  console.log(cartData);
  if (cartData == null) {
    var cartItems = 0;
  } else {
    var cartItems = cartData.length;
  }

  const sum = cartData.reduce((total, item) => {
    const product = item && item[0] && item[0].product;
    if (product && product.price) {
      return total + parseFloat(product.price);
    }
    return total;
  }, 0);

  
  const cartRemoveButtonHandler = (productId) => {
    const updatedCartData = cartData.filter((item) => {
      const product = item && item[0] && item[0].product;
      return product.id !== productId;
    });
    var cartString = JSON.stringify(updatedCartData);
      
    localStorage.setItem('cartData', cartString);
    setCartData(updatedCartData);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Items ({cartData.length})</h3>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => {
                  const product = item && item[0] && item[0].product;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={`/images/${product.title}.webp`}
                            className="img-thumbnail"
                            width="80"
                            alt="..."
                          />
                        </Link>
                        <p>
                          <Link to={`/product/${product.id}`}>
                            {product.title}
                          </Link>
                        </p>
                      </td>
                      <td>Rs. {product.price}</td>
                      <td>
                        <button
                          title="Remove From Cart"
                          type="button"
                          onClick={() => cartRemoveButtonHandler(product.id)} 
                          className="btn btn-primary"
                        >
                          <i className="fa-solid fa-cart-plus"></i>Remove From
                          Cart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Total</th>
                  <th>Rs. {sum}</th>
                </tr>
                <tr>
                  <td colSpan="3" align="right">
                    <Link to="/categories" className="btn btn-secondary">
                      Continue Shopping
                    </Link>
                    <Link to="/order/success" type='button' className="btn btn-success ms-1">Place Order</Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
