import { Link } from "react-router-dom"
import axios from "axios";
import { useContext,useState } from "react";
import { CartContext } from "../Context";


const baseUrl='http://127.0.0.1:8000/';
function OrderSuccess(){
    const [ConfirmOrder,setConfirmOrder]= useState(false);
    const {cartData, setCartData }= useContext(CartContext);
    const user = localStorage.getItem('customer_login');
    console.log(user);
    if(!user){
        window.location.href= "/customer/login/";
        return null
    }else{
        if(ConfirmOrder==false){
            addOrderInTable();
        }
        
    }
    
    function addOrderInTable(){
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append('customer',customerId);
        console.log("b");
        console.log(formData);
        axios.post(baseUrl+'orders/',formData)
        .then(function(response){
            var orderId=response.data.id;
            orderItems(orderId);
            setConfirmOrder(true);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    function orderItems(orderId){
        
        const previousCart=localStorage.getItem('cartData');
        const cartJson=JSON.parse(previousCart);

        if(cartJson!=null){
            cartJson.map((cart)=>{
                const formData=new FormData();
                formData.append('order',orderId);
                formData.append('product',cart[0].product.id);
                formData.append('qty',1);
                formData.append('price',cart[0].product.price);

                axios.post(baseUrl+'orderitems/',formData)
                .then(function(response){
                    cartJson.splice(0, 1);
                    localStorage.setItem('cartData',JSON.stringify(cartJson));
                    setCartData(cartJson);
                })
                .catch(function(error){
                    console.log(error);
                });
            });
        }
        

    }

    return(
        <div className="container mt-4">
            <div className='row'>
                <div className='col-md-8 offset-2'>
                    <div className="card">
                        <div className="card-body text-center">
                            <p><i className="fa fa-check-circle text-success fa-3x"></i></p>
                            <h3 className="text-success">Thanks for the Order.</h3>
                            <p><Link to="/" className="btn btn-primary mt-2">Home</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess

