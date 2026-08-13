//tax is fixed in 8% of totalPrice of the purchase
//expectedSubtotal

export const calculateTotal = (subtotal) => {
  let subtotalParsed = parsePriceToFloat(subtotal);
  return (calculateTax(subtotalParsed) + subtotalParsed).toFixed(2);
};

export const calculateTax = (subtotalParsed) => {
  const tax = 0.08;
  return Number((tax * subtotalParsed).toFixed(2));
};

export const parsePriceToFloat = (price) => {
  return Number(price.replace(/[^0-9.]/g, ''));
};
