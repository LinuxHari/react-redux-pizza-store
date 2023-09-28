import { getIngredients } from "../helpers/orderHelper";

const FetchIngredients = ({ id, items }) => {
  const ingredients = getIngredients(id, items);
  return <p>{ingredients.join(", ")}</p>;
};

export default FetchIngredients;
