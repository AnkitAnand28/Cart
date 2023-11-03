import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

function Orders() {
  const baseUrl = "http://127.0.0.1:8000/";
  const customerId = localStorage.getItem("customer_id");
  const [OrderItems, setOrderItems] = useState([]);
  useEffect(() => {
    fetchData(baseUrl + "customer/" + customerId + "/orderitems/");
  });

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setOrderItems(data.results);
      });
  }
  const orderItemsCount =OrderItems.length;
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderItems.map((item, index) => {
                    return (
                        
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <p>
                            <img
                              src={`/images/${item.product.title}.webp`}
                              className="img-thumbnail"
                              width="80"
                              alt="..."
                            />
                            <Link className="ms-2">{item.product.title}</Link>
                          </p>
                        </td>
                        <td>Rs. {item.product.price}</td>
                      </tr>
                      
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Orders;
