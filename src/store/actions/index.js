import toast from "react-hot-toast";
import api from "../../api/api"
import { data } from "react-router-dom";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({type: "IS_FETCHING"}); // indicates we're beginning the fetching process from the api 
    const {data} = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({type: "IS_SUCCESS"})
  } 
  catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed fetching products", // optional chaining  
    });
  }
}

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get("/public/categories", {
    params: {
      pageNumber: 0,
      pageSize:   100,
      sortBy:     "categoryId",
      sortOrder:  "ascending",
    },
  });
      dispatch({
      type: "FETCH_CATEGORIES",
      payload:       data.content,      
      pageNumber:    data.pageNumber,   
      pageSize:      data.pageSize,    
      totalElements: data.totalElements,
      totalPages:    data.totalPages,   
      lastPage:      data.lastPage,     
    });
    dispatch({ type: "IS_SUCCESS" });
  }
  catch (error) {
    console.error("Failed fetching categories:", error);
    dispatch({
    type:    "CATEGORY_ERROR",
    payload: error?.response?.data?.message || "Failed fetching categories",
    });
  }
};

export const addToCart = (data, quantity=1, toast) => 
  (dispatch, getState) => {
    const {products} = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    if (!getProduct) {
      toast.error("Product not found in the product list.");
      return; 
    }

    const isQuantityValid = getProduct.quantity >= quantity;
    if (isQuantityValid) {
      dispatch({type: "ADD_TO_CART", payload: {...data, quantity: quantity}});
      toast.success(`${data?.productName} added to cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Item out of stock")
    }
}

export const increaseCartQuantity = 
  (data, toast, currentyQuantity, setCurrentQuantity) => 
  (dispatch, getState) => {
    const {products} = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    if (!getProduct) {
      toast.error("Product not found in the product list.");
      return; 
    }

    const isQuantityValid = getProduct.quantity >= currentyQuantity + 1;

    if (isQuantityValid) {
      const newQuantity = currentyQuantity + 1;
      setCurrentQuantity(newQuantity);

      dispatch({
        type:"ADD_TO_CART",
        payload:{...data, quantity: newQuantity}
      })
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("maximum quantity is reached")
    }
  }

export const decreaseCartQuantity = 
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {...data, quantity: newQuantity},
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  }

export const removeFromCart = 
  (data, toast) => (dispatch, getState) => {
    dispatch({type:"REMOVE_FROM_CART", payload:data});
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  }