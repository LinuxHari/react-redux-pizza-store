import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setInfo, changePriority } from "../features/OrderSlice";
import { clearCart, getQuantity, getTotalPrice } from "../features/CartSlice";
import { useState } from "react";
import "../styles/PlaceOrder.css";

const PlaceOrder = () => {
  const totalPrice = useSelector(getTotalPrice);
  const quantity = useSelector(getQuantity);
  const { userName } = useSelector((state) => state.user);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const id = location.state.id;
  const priorityCharge = parseFloat((quantity * 3.2).toFixed(2));

  const clicked = () => {
    if (isChecked !== true) {
      dispatch(changePriority({ id, totalPrice, priorityCharge }));
    } else {
      dispatch(changePriority({ id, totalPrice, priorityCharge: 0 }));
    }
    setIsChecked(!isChecked);
  };

  const submitForm = (data) => {
    dispatch(setInfo(data));
    dispatch(clearCart());
    reset();
    navigate(`/order/${id}`);
  };
  return (
    <section className="place-order">
      {cartItems.length > 0 ? (
        <form
          className="order-contents"
          onSubmit={handleSubmit(submitForm)}
          noValidate
        >
          <div className="caption">
            <h1>Ready to order? Let's go!</h1>
          </div>
          <div className="order-details">
            <div className="order-detail">
              <div className="label">
                <p>First Name</p>
              </div>
              <div className="data-field">
                <input
                  type="text"
                  defaultValue={userName}
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First name is required",
                    },
                    minLength: {
                      value: 5,
                      message: "First name must be at least 5 characters long",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName.message}</p>
                )}
              </div>
            </div>
            <div className="order-detail">
              <div className="label">
                <p>Phone Number</p>
              </div>
              <div className="data-field">
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Phone Number is required",
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Phone Number must be at least 10 characters long",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="error">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
            <div className="order-detail">
              <div className="label">
                <p>Address</p>
              </div>
              <div className="data-field">
                <input
                  type="text"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 digits long",
                    },
                  })}
                />
                {errors.address && (
                  <p className="error">{errors.address.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="order-priority">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={clicked}
            />
            <label htmlFor="checkbox">Want to give your order priority?</label>
          </div>
          <div>
            <input
              type="submit"
              className="place-order-btn"
              value={`Order now from $${(isChecked
                ? totalPrice + priorityCharge
                : totalPrice
              ).toFixed(2)}`}
            />
          </div>
        </form>
      ) : (
        <div className="empty">
          <Link to="/menu" className="back">
            ← Back to menu
          </Link>
          <h1>Your cart is still empty. Start adding some pizzas :)</h1>
        </div>
      )}
    </section>
  );
};

export default PlaceOrder;
