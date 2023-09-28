import { useSelector, useDispatch } from "react-redux";
import OrderAction from "./OrderAction";
import { addItem } from "../features/CartSlice";

const MenuItem = () => {
  const { items } = useSelector((state) => state.menu);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const isInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.pizzaId === itemId);
  };

  return (
    <>
      {items.map((item) => (
        <li className="menu-item" key={item.id}>
          <div className="item-img">
            {item.soldOut ? (
              <div
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: "cover",
                  width: "80px",
                  height: "80px",
                  opacity: 0.4,
                  zIndex: -1,
                }}
              ></div>
            ) : (
              <img src={item.imageUrl} alt={item.name} />
            )}
          </div>
          <div className="item-details">
            <div className="item-contents">
              <h4 className="item-name">{item.name}</h4>
              <p className="item-ingredients">{item.ingredients.join(", ")}</p>
            </div>
            <div className="item-events">
              {item.soldOut ? (
                <p className="item-price">Soldout</p>
              ) : (
                <p className="item-price">${item.unitPrice.toFixed(2)}</p>
              )}
              <div className="item-actions">
                {!item.soldOut && (
                  <>
                    {isInCart(item.id) ? (
                      <OrderAction item={item} />
                    ) : (
                      <input
                        type="button"
                        value="Add to cart"
                        onClick={() =>
                          dispatch(
                            addItem({
                              pizzaId: item.id,
                              name: item.name,
                              ingredients: item.ingredients,
                              quantity: 1,
                              price: item.unitPrice,
                            })
                          )
                        }
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default MenuItem;
