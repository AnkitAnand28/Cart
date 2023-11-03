import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";

function Home() {
  const baseUrl = "http://127.0.0.1:8000/";
  const [Products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);

  useEffect(() => {
    fetchData(baseUrl + "/products");
  });

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setTotalResults(data.count);
      });
  }
  return (
    <main className="mt-3">
      <div className="container">
        <h3 className="mb-4">
          Latest Products{" "}
          <Link to="products" className="float-end btn btn-sm btn-dark m-2">
            View All Products <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </h3>
        <div className="row mb-4">
          {Products.map((product) => (
            <SingleProduct product={product} />
          ))}
        </div>

        <div
          id="carouselExampleIndicators"
          className="carousel slide my-4 border bg-dark text-white p-5"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <figure className="text-end">
                <blockquote className="blockquote">
                  <p>On-time delivery. Great Site to Shop</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <cite title="Source Title">Customer1</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-end">
                <blockquote className="blockquote">
                  <p>Satisfied with the product quality.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <cite title="Source Title">Customer2</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-end">
                <blockquote className="blockquote">
                  <p>Highly Recommended.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <cite title="Source Title">Customer3</cite>
                </figcaption>
              </figure>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
