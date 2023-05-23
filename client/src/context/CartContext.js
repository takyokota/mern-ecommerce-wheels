import React, { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  // const [totalQty, setTotalQty] = useState(
  //   parseInt(localStorage.getItem("totalQty"))
  // );
  const [totalQty, setTotalQty] = useLocalStorage('totalQty', 0);

  const initializer = (initialValue) => {
    const keyValue = localStorage.getItem("cart");
    return keyValue ? JSON.parse(keyValue) : initialValue;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        setTotalQty(totalQty + 1);
        const tempState = state.filter((item) => item.id === action.payload.id);
        if (tempState.length > 0) {
          const nonDuplicates = state.filter(
            (item) => item.id !== action.payload.id
          );
          return [
            ...nonDuplicates,
            { ...tempState[0], qty: tempState[0].qty + 1 },
          ];
        } else {
          return [...state, action.payload];
        }
      case "INCREASE":
        setTotalQty(totalQty + 1);
        const tempState1 = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
        return tempState1;
      case "DECREASE":
        setTotalQty(totalQty - 1);
        const tempState2 = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
        return tempState2;
      case "REMOVE":
        const tempState3 = state.filter(
          (item) => item.id === action.payload.id
        );
        setTotalQty(totalQty - tempState3[0].qty);
        const restState = state.filter((item) => item.id !== action.payload.id);
        return restState;
      case "DELETE":
        setTotalQty(0);
        return (state = []);
      case "EMPTY":
        setTotalQty(0);
        return (state = []);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [], initializer);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch, totalQty }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
