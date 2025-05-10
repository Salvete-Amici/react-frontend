import api from "../../api/api"

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