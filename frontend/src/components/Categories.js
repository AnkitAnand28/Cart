import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Categories() {
  const baseUrl = "http://127.0.0.1:8000/";
  const [categories, setCategories] = useState([]);
  const [totalResult, setTotalResults] = useState(0);

  useEffect(() => {
    fetchData(baseUrl + "categories/");
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
        setTotalResults(data.count);
      });
  }

  function changeUrl(baseurl) {
    fetchData(baseurl);
  }
  
  return (
    <section className="container">
      <h3 className="mb-4">All Categories </h3>
      <div className="row mb-4">
        {categories.map((category) => (
          <div className="col-12 col-md-3 mb-4">
            <div className="card">
              <div className="text-center">
                <img
                  src={`/images/${category.title}.webp`}
                  className="card-img-top"
                  alt={category.title}
                  style={{ maxWidth: "250px", height: "300px" }}
                />
              </div>
              <div className="card-body">
                <h4 className="card-title">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/category/${category.title}/${category.id}`}
                  >
                    {category.title}
                  </Link>
                </h4>
              </div>
              <div className="card-footer">Product Bought: 2122</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Categories;
