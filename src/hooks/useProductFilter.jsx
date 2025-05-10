import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
  const { search } = useLocation(); 
  //once we have query string constructed for the backend, we can dispatch an event 
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(search);

    const currentPage = Number(params.get("page") || 1);
    params.delete("page");                       
    params.set("pageNumber", String(currentPage - 1));

    const sortBy = params.get("sortBy") || "price";
    const sortOrder = params.get("sortOrder") || "ascending";

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    const categoryParams = params.get("category");
    if(categoryParams) {
      params.set("category", categoryParams);
    } else {
      params.delete("category");
    }

    const keyword = params.get("keyword");
    if(keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }

    const queryString = params.toString();
    
    dispatch(fetchProducts(queryString));
  }, [dispatch, search]);
};

export default useProductFilter;