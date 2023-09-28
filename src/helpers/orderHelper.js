export const getRemainingTime = (deliveryTime) => {
  const currentTime = new Date();
  const remainingTime = new Date(deliveryTime) - currentTime;
  return Math.floor(remainingTime / (1000 * 60));
};

export const formatDate = (deliveryDate) => {
  const date = new Date(deliveryDate);
  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

export const getIngredients = (id, items) => {
  const item = items.find((item) => {
    return item.id === id;
  });
  return item.ingredients;
};
