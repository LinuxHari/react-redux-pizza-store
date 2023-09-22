import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { changePriority } from "../features/OrderSlice";
import "../styles/Order.css";
import { getOrderStatus, getRemainingTime } from "../helpers/orderHelper";

const Order = () => {
  const { orders, priorityCharge } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const order = orders.find((order) => order.id === id) || "";
  const remainingTime =
    order !== undefined ? getRemainingTime(order.deliveryTime) : 0;
  const orderStatus = getOrderStatus(remainingTime);

  return (
    <section className="order-status">
      {order ? (
        <>
          <div className="order-name">
            <h1>Order #{order.id} status</h1>
            <div className="order-process">
              {order.isPriority && <span className="priority">Priority</span>}
              <span className="order-state">{orderStatus}</span>
            </div>
          </div>
          {remainingTime > 0 && (
            <div className="order-time">
              <p className="time">Only {remainingTime} minutes left 😃</p>
              <span className="estimated-time">
                (Estimated delivery: {order.deliveryTime})
              </span>
            </div>
          )}
          {order.order.map((item) => (
            <div className="order-information" key={item.name}>
              <div className="order-items">
                <p>
                  {item.quantity}× {item.name}
                </p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="order-ingredients">
                <p>{item.ingredients.join(", ")}</p>
              </div>
            </div>
          ))}
          <div className="bill">
            <p>Price pizza: ${order.totalPrice.toFixed(2)} </p>
            {order.isPriority && (
              <p>Price priority: ${priorityCharge.toFixed(2)}</p>
            )}
            <p>
              {remainingTime < 0 ? "Paid" : "To pay"} on delivery: $
              {order.isPriority
                ? (order.totalPrice + priorityCharge).toFixed(2)
                : order.totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="priority-btn">
            {!order.isPriority && remainingTime > 10 && (
              <input
                type="button"
                value="Make Priority"
                onClick={() => dispatch(changePriority({ id: order.id }))}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/menu" className="back">
            ← Back to menu
          </Link>
          <h1 className="error">
            No order named <span className="id">{id}</span>...
          </h1>
        </>
      )}
    </section>
  );
};

export default Order;
