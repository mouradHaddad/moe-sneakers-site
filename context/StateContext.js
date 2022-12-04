import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; //this is going to be used to triger a pop-up notification whenever something is changed 


const Context = createContext();
 export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;


    const onAdd = (product, quantity) => {
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
        const checkProductInCart = cartItem.find((item) => item._id === product._id);
        if(checkProductInCart) { 

            const updateCartItems = cartItem.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                } 
                
            })
            setCartItem(updateCartItems);
        }else {
            product.quantity = quantity;
            
            setCartItem([ ...cartItem, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`)

    }
    const onRemove = (product) => {
        foundProduct = cartItem.find((item) => item._id === product._id);
        const newCartItems = cartItem.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItem(newCartItems);
      }
    
      const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItem.find((item) => item._id === id)
        index = cartItem.findIndex((product) => product._id === id);
        const newCartItems = cartItem.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          setCartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            setCartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
      }
    

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;            
            return prevQty - 1;
        });
    }

    return (
        <Context.Provider 
        value={{
            showCart,
            setShowCart,
            cartItem,
            totalPrice, 
            totalQuantities, 
            qty,
            incQty, 
            decQty, 
            onAdd,
            toggleCartItemQuanitity,
            onRemove,
            setCartItem,
            setTotalPrice,
            setTotalQuantities
            
        }}
        >
            {children} 
        </Context.Provider>
    )

 };

 export const useStateContext = () => useContext(Context)