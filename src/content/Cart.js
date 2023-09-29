import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/CartSlice";
import OrderAction from "./OrderAction";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="orders">
      <div className="order">
        <div className="caption">
          <Link to="/menu" className="back">
            ← Back to menu
          </Link>
          {cartItems.length ? <h1>Your cart, {userName}</h1> : null}
        </div>
        {cartItems.length ? (
          cartItems.map((item) => (
            <div key={item.pizzaId}>
              <div className="order-item">
                <p>
                  {item.quantity} x {item.name}
                </p>
                <div className="order-quantity">
                  <p className="total-amount">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <OrderAction key={item.pizzaId} cartItem={item} />
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
              onClick={() => navigate("/order/new")}
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
