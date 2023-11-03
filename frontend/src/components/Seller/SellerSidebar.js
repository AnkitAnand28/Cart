import {Link} from 'react-router-dom';

function SellerSidebar(){
    return(
        <div className="list-group">
            <Link className="list-group-item list-group-item-action" to="/seller/dashboard">Dashboard</Link>
            <Link to="/seller/products" className="list-group-item list-group-item-action">Products</Link>
            <Link to="/seller/add-product" className="list-group-item list-group-item-action">Add Product</Link>
            <Link to="/seller/orders" className="list-group-item list-group-item-action">Orders</Link>
            <Link href="#" className="list-group-item list-group-item-action">Customers</Link>
            <Link href="#" className="list-group-item list-group-item-action">Reports</Link>
            <Link to="/seller/change-password" className="list-group-item list-group-item-action">Change Password</Link>
            <Link href="#" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    )
}

export default SellerSidebar