const isActivePendingOrder = (order) => {
  return order?.orderId && order?.orderStatus === "PENDING_PAYMENT";
};

const getSavedPendingOrder = () => {
  try {
    const saved = localStorage.getItem("pendingCheckoutOrder");
    const order = saved ? JSON.parse(saved) : null;

    if (isActivePendingOrder(order)) {
      return order;
    }

    localStorage.removeItem("pendingCheckoutOrder");
    return null;
  } catch {
    localStorage.removeItem("pendingCheckoutOrder");
    return null;
  }
};

const initialState = {
  pendingOrder: getSavedPendingOrder(),
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE_PENDING_ORDER":
      return {
        ...state,
        pendingOrder: action.payload,
      };

    case "PAYMENT_EVENT_PROCESSED": {
      const order = action.payload;

      if (isActivePendingOrder(order)) {
        return {
          ...state,
          pendingOrder: order,
        };
      }

      return {
        ...state,
        pendingOrder: null,
      };
    }

    case "CLEAR_PENDING_ORDER":
      return {
        ...state,
        pendingOrder: null,
      };

    default:
      return state;
  }
};
