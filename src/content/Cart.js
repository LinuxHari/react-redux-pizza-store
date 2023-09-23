import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/CartSlice";
import { orderItem } from "../features/OrderSlice";
import { getTotalPrice } from "../features/CartSlice";
import OrderAction from "./OrderAction";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getId = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const id = getId();

  const submitOrder = () => {
    dispatch(orderItem({ id, cartItems, totalPrice }));
    navigate("/order/new", { state: { id } });
  };

  return (
    <section className="orders">
      <div className="order">
        <div className="caption">
          <Link to="/menu" className="back">
            ← Back to menu
          </Link>
          {cartItems.length ? <h1>Your cart, haeo</h1> : null}
        </div>
        {cartItems.length ? (
          cartItems.map((item) => (
            <div key={item.id}>
              <div className="order-item">
                <p>
                  {item.quantity} x {item.name}
                </p>
                <div className="order-quantity">
                  <p className="total-amount">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <OrderAction key={item.id} item={item} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="empty">
            Your cart is still empty. Start adding some pizzas :)
          </h1>
        )}
        {cartItems.length > 0 && (
          <div className="order-actions">
            <input
              type="button"
              className="order-btn"
              value="Order Pizzas"
              onClick={submitOrder}
            />
            <input
              type="button"
              className="cancel-btn"
              value="Clear Cart"
              onClick={() => dispatch(clearCart())}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
