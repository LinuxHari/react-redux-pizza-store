export const deleteItem = (cartList, pizzaId) => {
  return cartList.filter((item) => item.pizzaId !== pizzaId);
};

export const incQuantity = (cartList, pizzaId) => {
  return cartList.map((item) =>
    item.pizzaId === pizzaId ? { ...item, quantity: item.quantity + 1 } : item
  );
};

export const decQuantity = (cartList, pizzaId) => {
  const finalCart = cartList.map((item) =>
    item.pizzaId === pizzaId
      ? item.quantity === 1
        ? null
        : { ...item, quantity: item.quantity - 1 }
      : item
  );
  return finalCart.filter((item) => item !== null);
};
