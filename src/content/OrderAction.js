import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../features/CartSlice";

const OrderAction = ({ item, cartItem }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  item = cartItem ? { ...cartItem, id: cartItem.pizzaId } : item;
  return (
    <>
      <input
        type="button"
        className="action decrement"
        value="-"
        onClick={() => dispatch(decreaseQuantity({ pizzaId: item.id }))}
      />
      <span className="count">
        {cartItems.find((cartItem) => cartItem.pizzaId === item.id)?.quantity ||
          0}
      </span>
      <input
        type="button"
        className="action increment"
        value="+"
        onClick={() => dispatch(increaseQuantity({ pizzaId: item.id }))}
      />
      <input
        type="button"
        className="action delete"
        value="Delete"
        onClick={() => dispatch(removeItem({ pizzaId: item.id }))}
      />
    </>
  );
};

export default OrderAction;
