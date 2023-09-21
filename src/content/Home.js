import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUser = (event) => {
    event.preventDefault();
    if (user === "") {
      dispatch(setName(event.target.username.value));
    }
    navigate("/menu");
    setUserName("");
  };

  return (
    <section className="content">
      <div className="details">
        <h1 className="theme">
          The best pizza. <br />
          <span className="wrap">
            Straight out of the oven, straight to you.
          </span>
        </h1>
        <form action="" className="data-submit" onSubmit={(e) => setUser(e)}>
          {!user && (
            <>
              <p className="message" id="message">
                Welcome! Please start by telling us your name:
              </p>
              <input
                type="text"
                className="username"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name"
                autoComplete="off"
                required
              />
            </>
          )}
          {userName ? (
            <button type="submit" className="submit" id="submit">
              Start ordering
            </button>
          ) : user ? (
            <Link to="/menu" className="link">
              Continue Ordering, {user}
            </Link>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default Home;
