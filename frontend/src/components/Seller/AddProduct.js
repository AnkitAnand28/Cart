import SellerSidebar from "./SellerSidebar"

function AddProduct(){
    return(
        <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
        <SellerSidebar />
        </div>
            <div className="col-md-9 col-12 mb-2">
            <div className="card">
                <h4 className="card-header">Add Product</h4>
                <div className="card-body">
                    <form>
                    <div className="mb-3">
                            <lable for="category" className="form-label">Category</lable>
                            <select className="form-control">
                                <option>Watch</option>
                                <option>SmartPhone</option>
                                <option>Shoes</option>
                                <option>Books</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <lable for="title" className="form-label">Title</lable>
                            <input type="text" className="form-control" id="title" />
                        </div>
                        <div className="mb-3">
                            <lable for="price" className="form-label">Price</lable>
                            <input type="text" className="form-control" id="price" />
                        </div>
                        <div className="mb-3">
                            <lable for="description" className="form-label">Description</lable>
                            <textarea className="form-control" id="description" />
                        </div>
                        <div className="mb-3">
                        <div className="mb-3">
                            <lable for="productImg" className="form-label">Product Images</lable>
                            <input type="file" className="form-control" id="productImg" />
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default AddProduct