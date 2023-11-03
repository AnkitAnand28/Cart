import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";

function AllProducts() {
  const baseUrl = "http://127.0.0.1:8000/";
  const [Products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  useEffect(() => {
    fetchData(baseUrl + "/products");
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setTotalResults(data.count);
        console.log(data.count)
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
          onClick={() => changeUrl(baseUrl + `/products/?page=${i}`)}
          to={`/products/?page=${i}`}
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

export default AllProducts;
