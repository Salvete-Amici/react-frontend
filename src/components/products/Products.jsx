import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from '../shared/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";
import { useEffect } from "react";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Pagination from "../shared/Pagination";

const Products = () => {
  const dispatch = useDispatch();

  // const isLoading = false; 
  // const errorMessage = "";
  //obtain values for these two from Redux store
  const { isLoading, errorMessage } = useSelector(state => state.errors);
  const { products, categories, pagination }   = useSelector(state => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  // const products = [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useProductFilter();

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories || []} />
      {
        isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="min-h-[700px]">
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
              {products && products.map((item, i) => <ProductCard key={i} {...item}/>)} 
            </div>
            <div className="flex justify-center pt-10">
              <Pagination 
                numberOfPage = {pagination?.totalPages}
                totalElements= {pagination?.totalElements}/>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Products;