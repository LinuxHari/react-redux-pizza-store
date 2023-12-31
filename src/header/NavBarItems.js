import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";

const NavBarItems = () => {
  const { userName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    navigate(`/order/${event.target.id.value}`);
  };

  return (
    <>
      <div className="title">
        <Link to="/">BIZZO REACT</Link>
      </div>
      <div className="search">
        <form onSubmit={submit}>
          <input type="text" id="id" placeholder="Search order #" />
        </form>
      </div>
      {userName && (
        <div className="user">
          <BiSolidUser />
          <h3 className="username">{userName}</h3>
        </div>
      )}
    </>
  );
};

export default NavBarItems;
