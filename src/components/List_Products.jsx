import React, { useState, useEffect, useContext } from 'react'
import { TiShoppingCart } from 'react-icons/ti';
// import { listProducts, buyProduct } from "../ContractAp";
import { ethers } from "ethers";
import Cart from "../assets/images/cart.png";
import main from '../ContractAp';
import { walletContext } from '../App';


const List_Products = () => {

   const [products, setProducts] = useState([]);
   const {isConnected} = useContext(walletContext);
  //  const [connected, setConnected] = useState(false);

   useEffect(() => {
     const getProducts = async () => {
       //  setProducts(product);
       if(isConnected){
         const mainFunction = await main()

         console.log(mainFunction);
         const product = await mainFunction.listProducts();
         console.log(product)
         setProducts(product)
         console.log('product fetch Successfully')
      }
     };
     getProducts();
   }, [isConnected]);


 const handleBuy = async (id,price) => {
    // await buyProduct(id, price);
   alert("Order Placed Successfully");
 };
  return (
    <>
      <section className="product-container">
        <div className="text">
          <h1>Explore Exclusive Products on Our Decentralized Marketplace.</h1>
          <p>
            Discover unique items, buy securely using cryptocurrency, and enjoy
            full ownership of your purchases, all powered by blockchain
            technology.
          </p>

          <button className="buy">Buy Now</button>
        </div>
        <img src={Cart} alt="" className="cart" />
      </section>
      <div className="product-image">
        <h2>Our Available Products</h2>

        <div className="product-card">
         
         {products.map((product) =>{
            return (
              <div className="product-box">
                <img src={product[4]} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${ethers.formatEther(product[2])} ETH</p>
                <button
                  className="cart-btn"
                  onClick={() =>
                    handleBuy(
                      product[0].toString(),
                      ethers.formatEther(product[2])
                    )
                  }
                >
                  Buy Now <TiShoppingCart className="cart-icon" />
                </button>
              </div>
            );
         })}
        </div>
      </div>
    </>
  );
}

export default List_Products