import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBarItems = () => {
  const { userName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const submit = (event) => {
    navigate(`/order/${event.target.id.value}`);
  };

  return (
    <>
      <div className="title">
        <h1>Fast React Pizza</h1>
      </div>
      <div className="search">
        <form onSubmit={submit}>
          <input type="text" id="id" placeholder="Search order" />
        </form>
      </div>
      {userName && (
        <div>
          <h3>{userName}</h3>
        </div>
      )}
    </>
  );
};

export default NavBarItems;
