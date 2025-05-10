import MuiPagination from "@mui/material/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({numberOfPage, totalElements}) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const paramValue = searchParams.get("page")
                  ? Number(searchParams.get("page"))
                  :1;

  // define a function that will be called when the user wants to change the page
  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <MuiPagination
      count={numberOfPage}
      page={paramValue}
      siblingCount={0}
      boundaryCount={2}
      shape="rounded"
      onChange={onChangeHandler}
    />
  )
};

export default Pagination;