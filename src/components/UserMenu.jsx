import { Avatar, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import React from "react";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../store/actions";
import Backdrop from "./Backdrop";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const buttonRef = React.useRef(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    buttonRef.current?.focus();
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleClose();

    setTimeout(() => {
      navigate(path);
    }, 0);
  };

  const logOutHandler = () => {
    handleClose();

    setTimeout(() => {
      dispatch(logOutUser(navigate));
    }, 0);
  };

  return (
    <div className="relative z-30">
      <button
        ref={buttonRef}
        id="basic-button"
        type="button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className="flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 bg-transparent border-0 p-0"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </button>

      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 160 },
        }}
      >
        <MenuItem
          className="flex gap-2"
          onClick={() => handleNavigate("/profile")}
        >
          <BiUser className="text-xl" />
          <span className="font-bold text-[16px] mt-1">{user?.username}</span>
        </MenuItem>

        <MenuItem
          className="flex gap-2"
          onClick={() => handleNavigate("/profile/orders")}
        >
          <FaShoppingCart className="text-xl" />
          <span className="font-semibold">Orders</span>
        </MenuItem>

        <MenuItem className="flex gap-2" onClick={logOutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-amber-300 px-4 py-1 text-white rounded-sm">
            <IoMdExit className="text-xl" />
            <span className="font-bold text-[16px] mt-1">Logout</span>
          </div>
        </MenuItem>
      </Menu>

      {open && <Backdrop />}
    </div>
  );
};

export default UserMenu;
