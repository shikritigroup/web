export const addAddress = ({
  name,
  phone,
  addressLine1,
  addressLine2,
  district,
  state,
  pin,
}) => {
  localStorage.setItem(
    "myAddress",
    JSON.stringify({
      name,
      phone,
      addressLine1,
      addressLine2,
      district,
      state,
      pin,
    })
  );
};

export const getAddress = () => {
  return localStorage.getItem("myAddress")
    ? JSON.parse(localStorage.getItem("myAddress"))
    : {};
};
