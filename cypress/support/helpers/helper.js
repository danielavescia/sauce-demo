//tax is fixed in 8% of totalPrice of the purchase

export const calculateTotal = (itemTotal) => {
  let itemTotalParsed = +itemTotal.replace(/[^0-9.]/g, '');
  return (calculateTax(itemTotalParsed) + itemTotalParsed).toFixed(2);
};

export const calculateTax = (itemTotalParsed) => {
  const tax = 0.08;
  return tax * itemTotalParsed;
};
