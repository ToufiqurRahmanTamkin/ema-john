import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first90 = fakeData.slice(0, 90);
    const [products, setProducts] = useState(first90);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
        // console.log('product added', product);
        const newCart = [...cart,product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="shop-container">
            
            <div className="product-container">
                {
                    products.map(pd =>
                    <Product 
                        key={pd.key}
                        handleAddProduct = {handleAddProduct}
                        product ={pd}
                        showAddToCart = {true}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;