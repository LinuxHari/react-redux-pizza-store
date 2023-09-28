import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuItems from "./MenuItems";
import Loading from "../Loading";
import "../styles/Menu.css";

const Menu = () => {
  const { loading } = useSelector((state) => state.menu);
  const [isloading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  if (isloading) return <Loading />;
  return (
    <section className="menu">
      <MenuItems />
    </section>
  );
};

export default Menu;
