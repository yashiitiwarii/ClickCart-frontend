import React, { useEffect, useState } from "react";
import { getJwt, getUser } from "./services/userServices";
import "./App.css";
import UserContext from "./contexts/UserContext";
import NavBar from "./Components/NavBar";
import Routingg from "./Components/Routing/Routingg";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCartAPI } from "./services/cartServices";
import CartContext from "./contexts/CartContext";
setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        const jwtUser = getUser();
        if (Date.now() >= jwtUser.exp * 1000) {
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          setUser(jwtUser);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Succesfully!");
      })
      .catch((err) => {
        toast.error("Failed to add product!");
        setCart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id); //this gives a new array after filtering the given item id
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }

    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });

      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
      });
    }
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <NavBar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routingg />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
