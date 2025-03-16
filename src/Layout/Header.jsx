import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Hamburger from "hamburger-react";
import { IoCartOutline } from "react-icons/io5";
import { GetAPI } from "../Utils/API_config";
import { API_url } from "../Utils/API_config";

const Header = () => {
  const Nav_link = [
    { id: 1, to: "/", name: "Home" },
    { id: 4, to: "/product", name: "Products" },
    { id: 2, to: "/about", name: "About" },
    { id: 3, to: "/contact", name: "Contact" },
  ];

  const [isOpen, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const pageLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus(); // Check if the user is logged in
    fetchCartData();
  }, []);

  // Check if the user is logged in by reading the token from cookies
  const checkAuthStatus = () => {
    const token = Cookies.get("Access_token"); // Read token from cookies
    setIsAuthenticated(!!token); // Set auth state based on token existence
  };

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await GetAPI(API_url.Get_Cart_data);
      if (response?.data) {
        const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      }
    } catch (error) {
      console.log("cart_error ==>>", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    Cookies.remove("Access_token"); // Remove token from cookies
    setIsAuthenticated(false); // Update auth state
    navigate("/auth"); // Redirect to login page
  };

  return (
    <>
      <div className="flex px-3 py-4 text-[18px] lg:px-10 w-full bg-white fixed shadow-md z-50 items-center">
        {/* Large Screen Navbar */}
        <div className="flex justify-between w-full">
          <div className="text-[25px] font-bold">Khet Connect</div>

          <div className="hidden lg:flex gap-8">
            {Nav_link.map((item) => {
              const isActive =
              item.to === "/product"
                ? pageLocation.pathname.startsWith("/product") // Match "/product" and "/product/category"
                : pageLocation.pathname === item.to;
              return (
                <Link
                  key={item.id}
                  className={`px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-amber-200 text-black" : "hover:bg-gray-100"
                  }`}
                  to={item.to}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Show Sign-in if not logged in, otherwise show Logout */}
          {!isAuthenticated ? (
            <div className="bg-amber-200 px-5 py-2 rounded-lg">
              <NavLink to="/auth">Sign in</NavLink>
            </div>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 px-5 py-2 rounded-lg text-white">
              Logout
            </button>
          )}
        </div>

        {/* Cart Icon with Badge */}
        <div className="relative mx-5">
          <NavLink to="/cart" className="relative">
            <IoCartOutline size={26} className="text-black" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-50">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile View Navbar Button */}
        <div className="lg:hidden">
          <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} size={20} color="#000" />
        </div>
      </div>

      {/* Mobile View Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-18 bg-black w-full text-center py-10 transition">
          {Nav_link.map((item) => {
            const isActive = pageLocation.pathname === item.to;
            return (
              <Link
                key={item.id}
                className={`block py-3 text-lg ${isActive ? "text-blue-300" : "text-white"}`}
                to={item.to}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Header;
