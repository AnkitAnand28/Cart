import SellerSidebar from "./SellerSidebar"

function VendorChangePassword(){
    return(
        <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
        <SellerSidebar />
        </div>
            <div className="col-md-9 col-12 mb-2">
            <div className="card">
                <h4 className="card-header">Change Password</h4>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label for="pwd" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="pwd"></input>
                        </div>
                        <div className="mb-3">
                            <label for="cpwd" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpwd"></input>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default VendorChangePassword