import { Link } from "react-router-dom";
import product1 from "/home/bh-cp0104/case_study/Shopping_cart/frontend/src/images/product1.png";
import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const baseUrl = "http://127.0.0.1:8000/";
  const [Products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  const { category_slug, category_id } = useParams();

  useEffect(() => {
    fetchData(baseUrl + "/products/?category=" + category_id);
  });

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setTotalResults(data.count);
      });
  }

  function changeUrl(baseurl) {
    fetchData(baseurl);
  }

  var links = [];
  var limit = 8;
  var totallinks = Math.ceil(totalResult / limit);
  for (let i = 1; i <= totallinks; i++) {
    links.push(
      <li class="page-item">
        <Link
          onClick={() =>
            changeUrl(baseUrl + `/products/?category=${category_id}&page=${i}`)
          }
          to={`/category/${category_slug}/${category_id}/?page=${i}`}
          class="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Products</h3>
      <div className="row mb-4">
        {Products.map((product) => (
          <SingleProduct product={product} />
        ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination">{links}</ul>
      </nav>
    </div>
  );
}

export default CategoryProducts;
