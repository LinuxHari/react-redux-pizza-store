import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Menu from "./content/Menu";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Cart from "./content/Cart";
import PlaceOrder from "./content/PlaceOrder";
import { getMenu } from "./api/getMenu";
import { useDispatch } from "react-redux";
import Order from "./content/Order";

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} loader={dispatch(getMenu())} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order">
          <Route path="new" element={<PlaceOrder />} />
          <Route path=":id" element={<Order />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
