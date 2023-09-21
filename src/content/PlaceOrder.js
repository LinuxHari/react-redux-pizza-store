import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setInfo, changePriority } from "../features/OrderSlice";
import { clearCart, getTotalPrice } from "../features/CartSlice";
import { useState } from "react";
import "../styles/PlaceOrder.css";

const PlaceOrder = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const id = location.state.id;

  const clicked = () => {
    setIsChecked(!isChecked);
    dispatch(changePriority({ id }));
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
              <div className="data-field">
                <p>First Name</p>
                <input
                  type="text"
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
              </div>
              <p className="message">
                {errors.firstName && errors.firstName.message}
              </p>
            </div>
            <div className="order-detail">
              <div className="data-field">
                <p>Phone Number</p>
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
              </div>
              <p className="message">
                {errors.phoneNumber && errors.phoneNumber.message}
              </p>
            </div>
            <div className="order-detail">
              <div className="data-field">
                <p>Address</p>
                <input
                  type="text"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address name is required",
                    },
                    minLength: {
                      value: 10,
                      message: "Address must be at least 5 characters long",
                    },
                  })}
                />
              </div>
              <p className="message">
                {errors.address && errors.address.message}
              </p>
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
            <p>Want to yo give your order priority?</p>
          </div>
          <div>
            <input
              type="submit"
              className="place-order-btn"
              value={`Order now from $${totalPrice.toFixed(2)}`}
            />
          </div>
        </form>
      ) : (
        <>
          <Link to="/menu" className="back">
            ← Back to menu
          </Link>
          <h1>Your cart is empty...</h1>
        </>
      )}
    </section>
  );
};

export default PlaceOrder;
