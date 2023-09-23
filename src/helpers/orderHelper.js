export const getTime = () => {
  const remainingTime = Math.floor(Math.random() * 50) + 10;
  let currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + remainingTime);
  const deliveryTime = currentTime.toLocaleString();
  return deliveryTime;
};

export const getRemainingTime = (deliveryTime) => {
  const currentTime = new Date();
  const remainingTime = new Date(deliveryTime) - currentTime;
  return Math.floor(remainingTime / (1000 * 60));
};

export const getOrderStatus = (remainingTime) => {
  if (remainingTime <= 0) return "Order Delivered";
  else if (remainingTime > 0 && remainingTime <= 10) return "Out for Delivery";
  else {
    return "Preparing Order";
  }
};
