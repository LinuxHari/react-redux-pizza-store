export const deleteItem = (cartList, id) => {
  return cartList.filter((item) => item.id !== id);
};

export const incQuantity = (cartList, id) => {
  return cartList.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
};

export const decQuantity = (cartList, id) => {
  const finalCart = cartList.map((item) =>
    item.id === id
      ? item.quantity === 1
        ? null
        : { ...item, quantity: item.quantity - 1 }
      : item
  );
  return finalCart.filter((item) => item !== null);
};
