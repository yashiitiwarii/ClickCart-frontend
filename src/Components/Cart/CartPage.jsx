import React, { useEffect, useState, useContext } from "react";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/assets/remove.png";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { convertToINR } from "../../utils/currencyUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);

  // const checkout = () => {
  //   const oldCart = [...cart];
  //   setCart([]);
  //   checkoutAPI()
  //     .then(() => {
  //       toast.success("Your Order is placed!");
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 3000);
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong!");
  //       setCart(oldCart);
  //     });

  const checkout = () => {
    const oldCart = [...cart]; // Preserve the current cart state
    setCart([]); // Clear the cart
    checkoutAPI()
      .then(() => {
        toast.success("Your Order is placed!");
        setTimeout(() => {
          navigate("/"); // Navigate to home after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        // Include error parameter to log errors
        console.error("Checkout failed: ", error); // Log error for debugging
        toast.error("Something went wrong!");
        setCart(oldCart); // Restore the cart in case of an error
      });
  };

  return (
    <section className="align_center cart_page">
      <ToastContainer />
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user Profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>₹{convertToINR(product.price)}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>₹{convertToINR(product.price) * quantity}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>₹{convertToINR(subTotal)}</td>
          </tr>

          <tr>
            <td>Shipping</td>
            <td>₹50</td>
          </tr>

          <tr className="cart_bill_final">
            <td>Total</td>
            <td>₹{convertToINR(subTotal) + 50}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
