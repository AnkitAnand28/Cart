import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function SingleProduct(props) {
  return (
    <div className="col-12 col-md-3 mb-2">
      <div className="card">
        <Link to={`/product/${props.product.title}/${props.product.id}`}>
          <div className="text-center"><img
            src={`/images/${props.product.title}.webp`}
            className="card-img-top"
            alt="..."
            style={{maxWidth:"200px", height:"200px"}}
          />
          </div>
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            <Link style={{textDecoration:"none"}} to={`/product/${props.product.title}/${props.product.id}`}>
              {props.product.title}
            </Link>
          </h5>
          <h5 className="card-title text-muted">Rs. {props.product.price}</h5>
        </div>
        <div className="card-footer">
          <button title="Add to Cart" className="btn btn-success btn-sm">
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;

