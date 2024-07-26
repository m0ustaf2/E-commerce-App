import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setnumOfCartItems(response?.data?.numOfCartItems);
      setcartId(response?.data?.data?._id);
    }
  }
  

  useEffect(() => {
    getCart();
  }, []);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function removeItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateProductCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeItem,
        clearCart,
        updateProductCount,
        numOfCartItems,
        setnumOfCartItems,
        onlinePayment,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
