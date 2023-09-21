import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getQuantity, getTotalPrice } from "../features/CartSlice";
import "../styles/Footer.css";

const Footer = () => {
  const quantity = useSelector(getQuantity);
  const totalPrice = useSelector(getTotalPrice);
  return (
    <>
      {quantity && (
        <footer>
          <div className="data">
            <h3>
              {quantity} PIZZAS ${totalPrice.toFixed(2)}
            </h3>
            <h3>
              <Link to="/cart" className="to-cart">
                OPEN CART →
              </Link>
            </h3>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
