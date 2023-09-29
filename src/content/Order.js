import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/Order.css";
import { getOrder, makePriority } from "../api/orderActions";
import FetchIngredients from "./FetchIngredients";
import { formatDate, getRemainingTime } from "../helpers/orderHelper";
import Loading from "../Loading";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [isPriority, setIsPriority] = useState(false);
  const { items } = useSelector((state) => state.menu);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrder(id);
        if (response.length) {
          setOrder(response.data);
          setIsPriority(response.data.priority);
        }
      } catch {
        console.log("Order is not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id, isPriority]);

  const getPriority = async (id) => {
    await makePriority(id);
    setIsPriority(true);
  };

  const remainingTime = getRemainingTime(order.estimatedDelivery);
  const deliveryTime = formatDate(order.estimatedDelivery);
  if (isLoading) return <Loading />;
  if (order.length)
    return (
      <section className="order-status">
        <div className="order-name">
          <h1>Order #{order.id} status</h1>
          <div className="order-process">
            {isPriority && <span className="priority">Priority</span>}
            <span className="order-state">
              {remainingTime > 0
                ? remainingTime < 10
                  ? "Out for delivery"
                  : `${order.status} order`
                : "Order delivered"}
            </span>
          </div>
        </div>
        {remainingTime > 0 && (
          <div className="order-time">
            <p className="time">Only {remainingTime} minutes left 😃</p>
            <span className="estimated-time">
              (Estimated delivery: {deliveryTime})
            </span>
          </div>
        )}
        {order.cart?.map((item) => (
          <div className="order-information" key={item.pizzaId}>
            <div className="order-items">
              <p>
                {item.quantity}x {item.name}
              </p>
              <p>${item.totalPrice.toFixed(2)}</p>
            </div>
            <div className="order-ingredients">
              <FetchIngredients id={item.pizzaId} items={items} />
            </div>
          </div>
        ))}
        <div className="bill">
          <p>Price pizza: ${order.orderPrice?.toFixed(2)} </p>
          {isPriority && (
            <p>Price priority: ${order.priorityPrice?.toFixed(2)}</p>
          )}
          <p>
            Pay on delivery: $
            {(
              order.orderPrice + (isPriority ? order.priorityPrice : 0)
            )?.toFixed(2)}
          </p>
        </div>
        {!isPriority && (
          <div className="priority-btn">
            <input
              type="button"
              value="Make Priority"
              onClick={() => getPriority(order.id)}
            />
          </div>
        )}
      </section>
    );
};

export default Order;
