import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../features/CartSlice";

const OrderAction = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <input
        type="button"
        className="action increment"
        value="+"
        onClick={() => dispatch(increaseQuantity({ id: item.id }))}
      />
      <span className="count">
        {cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
      </span>
      <input
        type="button"
        className="action decrement"
        value="-"
        onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
      />
      <input
        type="button"
        className="action delete"
        value="Delete"
        onClick={() => dispatch(removeItem({ id: item.id }))}
      />
    </>
  );
};

export default OrderAction;
