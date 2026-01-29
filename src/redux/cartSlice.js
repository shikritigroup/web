import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state) => {
      const myOrder = localStorage.getItem("myCart");
      state.cart = myOrder ? JSON.parse(myOrder) : {};
    },
    addToCart: (state, action) => {
      if (state.cart?.items) {
        const items = state.cart.items.filter(
          (item) => item.id === action.payload.itemId,
        );
        if (items?.length === 1) {
          state.cart = {
            deliveryFee: state.cart.deliveryFee,
            items: [
              ...state.cart.items.filter(
                (item) => item.id !== action.payload.itemId,
              ),
              {
                id: action.payload.itemId,
                type: action.payload.type,
                offerPrice: items[0].offerPrice,
                count: items[0].count + 1,
                order: items[0].order,
              },
            ],
          };
        } else {
          const maxOrder = Math.max(
            ...state.cart?.items?.map((item) => item?.order),
          );

          state.cart = {
            deliveryFee: state.cart.deliveryFee,
            items: [
              ...state.cart.items,
              {
                id: action.payload.itemId,
                type: action.payload.type,
                offerPrice: action.payload.offerPrice,
                count: 1,
                order: (maxOrder ?? 0) + 1,
              },
            ],
          };
        }
      } else {
        state.cart = {
          deliveryFee: action.payload.deliveryFee,
          items: [
            {
              id: action.payload.itemId,
              type: action.payload.type,
              offerPrice: action.payload.offerPrice,
              count: 1,
              order: 1,
            },
          ],
        };
      }

      localStorage.setItem("myCart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      if (state.cart?.items) {
        const items = state.cart.items.filter(
          (item) => item.id === action.payload.itemId,
        );
        if (items?.length === 1) {
          if (items[0].count > 1) {
            state.cart = {
              deliveryFee: state.cart.deliveryFee,
              items: [
                ...state.cart.items.filter(
                  (item) => item.id !== action.payload.itemId,
                ),
                {
                  id: action.payload.itemId,
                  type: action.payload.type,
                  offerPrice: items[0].offerPrice,
                  count: items[0].count - 1,
                  order: items[0].order,
                },
              ],
            };
          } else {
            if (
              state.cart.items.filter(
                (item) => item.id !== action.payload.itemId,
              )?.length > 0
            ) {
              state.cart = {
                deliveryFee: state.cart.deliveryFee,
                items: [
                  ...state.cart.items.filter(
                    (item) => item.id !== action.payload.itemId,
                  ),
                ],
              };
            } else {
              state.cart = {};
            }
          }
        }
      }

      localStorage.setItem("myCart", JSON.stringify(state.cart));
    },
  },
});

export const { loadCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
