import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

function AddressList() {
  const baseUrl = "http://127.0.0.1:8000/";
  const customerId = localStorage.getItem("customer_id");
  const [CustomerAddress, setCustomerAddress] = useState([]);
  useEffect(() => {
    fetchData(baseUrl + "customer/" + customerId + "/address/");
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setCustomerAddress(data.results);
      });
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col mb-4">
              <div className="card">
                <div className="card-body text-muted">
                  {CustomerAddress.map((address) => (
                    <div key={address.id} className="mb-4">
                      <div className="card">
                        <div className="card-body text-muted">
                          <h6>{address.address}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressList;
