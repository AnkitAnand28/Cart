import { json, useParams } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { UserContext,CartContext } from "../Context";

function ProductDetail() {
  const baseUrl='http://127.0.0.1:8000/'
  const [productData,setproductData] = useState([]);
  const [productImgs,setproductImgs] = useState([]);
  const {product_slug,product_id} = useParams();
  const [cartButtonClickStatus,setcartButtonClickStatus] = useState(false);
  const{cartData,setCartData}=useContext(CartContext);

  useEffect(() =>{
    fetchData(baseUrl+'/product/'+product_id);
    checkProductInCart(product_id);
  },[product_id]);  

  function fetchData(baseurl){
    fetch(baseurl)
    .then((response) => response.json())
    .then((data) =>{
      setproductData(data);
      setproductImgs(data.product_imgs)
      checkProductInCart(product_id);
    });
  }

  function checkProductInCart(product_id){
    var previousCart=localStorage.getItem('cartData');
    var cartJson=JSON.parse(previousCart);
 
    if (cartJson != null) {
      const productInCart = cartJson.find((cart) => cart[0] && cart[0].product && cart[0].product.id === product_id);
  
      if (productInCart) {
        setcartButtonClickStatus(true);
      }
    }
  }

  const cartAddButtonHandler = () =>{
    if(productData && productData.id)
    {var previousCart=localStorage.getItem('cartData');
    var cartJson=JSON.parse(previousCart);
    var cartData=[
      {
        'product':{
          'id':productData.id,
          'title':productData.title,
          'price':productData.price,
        },
        'user':{
          'id':1
        }
      }
    ];
    if(cartJson!=null){
      cartJson.push(cartData);
      var cartString=JSON.stringify(cartJson);
      localStorage.setItem('cartData',cartString);
      setCartData(cartJson);
    }else{
      var newCartList =[];
      newCartList.push(cartData);
      var cartString=JSON.stringify(newCartList);
      localStorage.setItem('cartData',cartString);
    }
    setcartButtonClickStatus(true);}
  }
   
  const cartRemoveButtonHandler = () => {
    if (productData && productData.id) {
      var previousCart = localStorage.getItem('cartData');
      var cartJson = JSON.parse(previousCart);
      var updatedCart = cartJson.filter((cart) => cart[0] && cart[0].product && cart[0].product.id !== productData.id);
      
      var cartString = JSON.stringify(updatedCart);
      
      localStorage.setItem('cartData', cartString);
      setcartButtonClickStatus(false);
      setCartData(updatedCart);
    }
  }

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
        <img
            src={`/images/${productData.title}.webp`}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="col-8">
          <h3>{productData.title}</h3>
          <p>{productData.detail}</p>
          <h5>Rs. {productData.price}</h5>
          <p className="mt-3">
            {!cartButtonClickStatus && 
            <button title="Add to Cart" type='button' onClick={cartAddButtonHandler} className="btn btn-warning">
              <i className="fa-solid fa-cart-plus"></i>Add To Cart
            </button>
            }
            {cartButtonClickStatus && 
            <button title="Remove From Cart" type='button' onClick={cartRemoveButtonHandler}  className="btn btn-primary">
              <i className="fa-solid fa-cart-plus"></i>Remove From Cart
            </button>
            
            }
            
            
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
