import {Link} from 'react-router-dom';

function Sidebar(){
    return(
        <div className="list-group">
            <Link className="list-group-item list-group-item-action" to="/customer/dashboard">Dashboard</Link>
            <Link className="list-group-item list-group-item-action" to="/customer/orders">Orders</Link>
            <Link to="/customer/profile" className="list-group-item list-group-item-action">Profile</Link>
            <Link to="/customer/addresses" className="list-group-item list-group-item-action">Address</Link>
        </div>
    )
}

export default Sidebar