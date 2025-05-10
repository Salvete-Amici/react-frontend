import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
// import path from "path-browserify";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const[searchParams] = useSearchParams(); // allows us to read & update url query params
  const { search, pathname } = useLocation(); 
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrder") || "ascending";
    const currentSearchTerm = searchParams.get("keyword") || "";
    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setsearchTerm(currentSearchTerm);
  }, [searchParams]); // trigger this hook whenever there's change in searchParams

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(search);
      if (searchTerm) {
        params.set("keyword", searchTerm);
      } else {
        params.delete("keyword");
      }
      navigate(`${pathname}?${params.toString()}`);
    }, 700); // avoid being triggered too frequently 
    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm, search, navigate, pathname]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const params = new URLSearchParams(search);
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    setCategory(selectedCategory);
    navigate(`${pathname}?${params.toString()}`);
  };

  const toggleSortOrder = () => {
    const next = sortOrder === "ascending" ? "descending" : "ascending";
    const params = new URLSearchParams(search);
    params.set("sortOrder", next);
    setSortOrder(next);
    navigate(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    navigate({pathname : window.location.pathname});
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input 
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}"/>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl className="text-slate-800 border-slate-700" variant="outlined" size="small">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select className="min-w-[120px] text-slate-800 border-slate-700" labelId="category-select-label" value={categories.length ? category : "all"} onChange={handleCategoryChange} label="Category">
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
            <MenuItem
              key={item.categoryId}
              value={item.categoryName}>
              {item.categoryName}              
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        {/* SORT BUTTON & CLEAR FILTER*/}
        <Tooltip title={`Sorted by price: ${sortOrder}`}>
          <Button 
          onClick={toggleSortOrder}
          variant="contained" color="primary" className="flex items-center gap-2 h-10">
            SORT BY 
            {sortOrder === "ascending" ? (
              <FiArrowUp size={20}/>
            ) : (
              <FiArrowDown size={20}/>
            )} 
          </Button>
        </Tooltip>
        <button 
          className="flex items-center gap-2 bg-red-700 text-white px-3 py-2 rounded-md shadow-md transition transform duration-150 ease-in-out
          hover:bg-red-800 active:scale-95 active:bg-red-900"
          onClick={handleClearFilters}>
          <FiRefreshCw className="font-semibold" size={16}/>
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;