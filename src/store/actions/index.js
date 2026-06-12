import api from "../../api/api";

const buildCartPayload = (cartItems) => {
  return (cartItems || []).map((item) => ({
    productId: item.productId,
    quantity: Number(item.quantity) || 1,
  }));
};

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get(`/public/products?${queryString}`);

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Unable to load book listings",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });

    const { data } = await api.get("/public/categories", {
      params: {
        pageNumber: 0,
        pageSize: 100,
        sortBy: "categoryId",
        sortOrder: "ascending",
      },
    });

    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.error("Failed fetching categories:", error);

    dispatch({
      type: "CATEGORY_ERROR",
      payload: error?.response?.data?.message || "Failed fetching categories",
    });
  }
};

export const addToCart =
  (data, quantity = 1, toast) =>
  async (dispatch, getState) => {
    const { user } = getState().auth;

    if (!user?.id) {
      toast.error("Please log in to add books to your cart.");
      return;
    }

    const { products } = getState().products;
    const { cart } = getState().carts;

    const getProduct = products.find(
      (item) => item.productId === data.productId,
    );

    if (!getProduct) {
      toast.error("Product not found in the product list.");
      return;
    }

    const existingCartItem = cart.find(
      (item) => item.productId === data.productId,
    );

    if (existingCartItem) {
      toast(
        "This item is already in your cart. Use the cart page to change quantity.",
      );
      return;
    }

    const isQuantityValid = getProduct.quantity >= quantity;

    if (!isQuantityValid) {
      toast.error("Item out of stock");
      return;
    }

    try {
      const nextCart = [...cart, { ...data, quantity }];
      await dispatch(createUserCart(buildCartPayload(nextCart)));

      toast.success(`${data?.productName} added to cart`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to add item to cart",
      );
    }
  };

export const increaseCartQuantity =
  (data, toast, currentyQuantity, setCurrentQuantity) =>
  async (dispatch, getState) => {
    const { products } = getState().products;
    const { cart } = getState().carts;

    const getProduct = products.find(
      (item) => item.productId === data.productId,
    );

    if (!getProduct) {
      toast.error("Product not found in the product list.");
      return;
    }

    const newQuantity = currentyQuantity + 1;
    const isQuantityValid = getProduct.quantity >= newQuantity;

    if (!isQuantityValid) {
      toast.error("maximum quantity is reached");
      return;
    }

    try {
      const nextCart = cart.map((item) => {
        if (item.productId === data.productId) {
          return { ...item, quantity: newQuantity };
        }

        return item;
      });

      await dispatch(createUserCart(buildCartPayload(nextCart)));

      setCurrentQuantity(newQuantity);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update cart quantity",
      );
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity) => async (dispatch, getState) => {
    if (newQuantity < 1) {
      return;
    }

    const { cart } = getState().carts;

    const nextCart = cart.map((item) => {
      if (item.productId === data.productId) {
        return { ...item, quantity: newQuantity };
      }

      return item;
    });

    await dispatch(createUserCart(buildCartPayload(nextCart)));
  };

export const removeFromCart = (data, toast) => async (dispatch, getState) => {
  try {
    const { cart } = getState().carts;

    const nextCart = cart.filter((item) => item.productId !== data.productId);

    await dispatch(createUserCart(buildCartPayload(nextCart)));

    toast.success(`${data.productName} removed from cart`);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Unable to remove item from cart",
    );
  }
};

export const clearCartAfterOrderCreated = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({ type: "CLEAR_CART" });
};

export const authenticateSigninUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);

      const { data } = await api.post("auth/signin", sendData);

      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));

      localStorage.removeItem("cartItems");
      localStorage.removeItem("pendingCheckoutOrder");
      localStorage.removeItem("CHECKOUT_ADDRESS");

      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "CLEAR_PENDING_ORDER" });
      dispatch({ type: "REMOVE_CHECKOUT_ADDRESS" });

      await dispatch(getUserCart());

      reset();
      toast.success("You're logged in");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);

      const { data } = await api.post("auth/signup", sendData);

      reset();
      toast.success(data?.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error",
      );
    } finally {
      setLoader(false);
    }
  };

export const logOutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  dispatch({ type: "CLEAR_CART" });
  dispatch({ type: "CLEAR_PENDING_ORDER" });

  localStorage.removeItem("auth");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("pendingCheckoutOrder");
  localStorage.removeItem("CHECKOUT_ADDRESS");

  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });

    try {
      if (!addressId) {
        await api.post("/addresses", sendData);
      } else {
        await api.put(`/addresses/${addressId}`, sendData);
      }

      dispatch(getUserAddresses());
      toast.success("Address saved successfully");
      dispatch({ type: "IS_SUCCESS" });
      setOpenAddressModal(false);
    } catch (error) {
      console.log("Address save error:", error);

      if (!error.response) {
        toast.error("Network/CORS error: request did not reach backend");
      } else if (error.response.status === 401) {
        toast.error("Unauthorized: login cookie missing or expired");
      } else if (error.response.status === 400) {
        toast.error(
          error.response.data?.message || "Bad request: check address fields",
        );
      } else {
        toast.error(error.response.data?.message || "Internal Server Error");
      }

      dispatch({ type: "IS_ERROR", payload: null });
    }
  };

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });

      await api.delete(`/addresses/${addressId}`);

      dispatch({ type: "IS_SUCCESS" });
      dispatch(getUserAddresses());
      dispatch(clearCheckoutAddress());
      toast.success("Address deleted successfully");
    } catch (error) {
      console.log(error);

      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Error Occured",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const clearCheckoutAddress = () => {
  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/addresses");

    dispatch({ type: "USER_ADDRESS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));

  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart());

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items",
    });

    throw error;
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/carts/users/cart");

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data?.products || [],
      totalPrice: data?.totalPrice || 0,
      cartId: data?.cartId || null,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);

    if (error?.response?.status === 404) {
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      dispatch({ type: "IS_SUCCESS" });
      return;
    }

    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart items",
    });
  }
};

export const placePendingOrder =
  ({ addressId, paymentMethod, idempotencyKey }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });

      const { cart } = getState().carts;
      const cartPayload = buildCartPayload(cart);

      if (cartPayload.length > 0) {
        await dispatch(createUserCart(cartPayload));
      }

      const { data } = await api.post(
        `/order/users/payments/${paymentMethod}`,
        {
          addressId,
          paymentMethod,
          pgName: "MOCK",
          pgPaymentId: null,
          pgStatus: "PENDING",
          pgResponseMessage: "Payment pending",
        },
        {
          headers: {
            "Idempotency-Key": idempotencyKey,
          },
        },
      );

      dispatch({
        type: "PLACE_PENDING_ORDER",
        payload: data,
      });

      localStorage.setItem("pendingCheckoutOrder", JSON.stringify(data));

      dispatch(clearCartAfterOrderCreated());

      dispatch({ type: "IS_SUCCESS" });

      return data;
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message || "Unable to create pending order",
      });

      throw error;
    }
  };

export const clearPendingOrder = () => (dispatch) => {
  dispatch({ type: "CLEAR_PENDING_ORDER" });
  localStorage.removeItem("pendingCheckoutOrder");
};

const newMockEventId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `mock_evt_${crypto.randomUUID()}`;
  }

  return `mock_evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const isTerminalOrder = (order) => {
  return (
    order?.orderStatus === "PAID" ||
    order?.orderStatus === "PAYMENT_FAILED" ||
    order?.orderStatus === "EXPIRED" ||
    order?.orderStatus === "CANCELLED" ||
    order?.orderStatus === "SHIPPED"
  );
};

export const processMockPaymentEvent =
  ({ orderId, eventType, providerPaymentId, failureReason }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });

      const { data } = await api.post("/payments/mock/events", {
        orderId,
        providerEventId: newMockEventId(),
        eventType,
        providerPaymentId: providerPaymentId || `mock_payment_${orderId}`,
        failureReason,
      });

      if (isTerminalOrder(data)) {
        dispatch({ type: "CLEAR_PENDING_ORDER" });
        localStorage.removeItem("pendingCheckoutOrder");
      } else {
        dispatch({
          type: "PAYMENT_EVENT_PROCESSED",
          payload: data,
        });

        localStorage.setItem("pendingCheckoutOrder", JSON.stringify(data));
      }

      dispatch({ type: "IS_SUCCESS" });

      return data;
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message || "Unable to process test payment",
      });

      throw error;
    }
  };

export const approveMockPayment = (orderId) =>
  processMockPaymentEvent({
    orderId,
    eventType: "PAYMENT_SUCCEEDED",
    providerPaymentId: `mock_payment_${orderId}`,
  });

export const declineMockPayment = (orderId) =>
  processMockPaymentEvent({
    orderId,
    eventType: "PAYMENT_FAILED",
    providerPaymentId: `mock_payment_${orderId}`,
    failureReason: "Payment declined in test sandbox",
  });

export const cancelPendingPaymentOrder = (orderId) =>
  processMockPaymentEvent({
    orderId,
    eventType: "PAYMENT_FAILED",
    providerPaymentId: `mock_payment_${orderId}`,
    failureReason: "Reservation cancelled by user in test sandbox",
  });
