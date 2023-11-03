import Sidebar from "./Sidebar";

function DashBoard() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
        <Sidebar />
        </div>
            <div className="col-md-9 col-12 mb-2">
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <div className="card">
                            <div className="card-body text-centre">
                                <h4>Total Order Items</h4>
                                <h4><a href="#">10</a></h4>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-md-4 mb-2">
                        <div className="card">
                            <div className="card-body text-centre">
                                <h4>Total Addresses</h4>
                                <h4><a href="#">2</a></h4>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default DashBoard;
