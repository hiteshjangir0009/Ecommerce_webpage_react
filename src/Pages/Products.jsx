import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { API_url, GetAPI, PostAPI } from "../Utils/API_config.jsx";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  // Fetch data from API
  useEffect(() => {
    GetData();
  }, []);

  // API Call
  const GetData = async () => {

    console.log("cat ==>>",category);
    
    let url = ``

    if (category == undefined) {
      url = API_url.Get_Data
    } else {
      url = `${API_url.Get_Data}?catagory=${category.toLowerCase()}`
    }
    try {
      const response = await GetAPI(url);
      console.log("response ==>>", response);

      if (response && response.data) {
        setProducts(response.data);
      } else {
        setProducts([]); // Handle empty response
      }
      setLoading(false);
    } catch (error) {
      console.log("Product_error ==>>", error);
      setLoading(false);
    }
  };

  const Add_to_cart = async (name, price, quantity) => {
    const formdata = new FormData();
    formdata.append("product_name", name);
    formdata.append("price", price);
    formdata.append("quantity", quantity);

    try {
      const response = await PostAPI(API_url.AddCard, formdata);
      console.log("response ==>>", response);

      // Reload the page after successful addition
      if (response?.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log("product_error ==>>", error);
    }
  };


  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    setCart((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  return (
    <Layout>
      <div className="p-5 ">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 h-screen flex justify-center items-center">No Data Available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-30">
            {products.map((item) => (
              <div key={item._id} className="border rounded-lg shadow-lg p-4">
                <span className="text-sm bg-gray-200 px-2 py-1  rounded-full">
                  {item.catagory || "Unknown Category"}
                </span>

                {/* Product Image */}
                <div className="h-40 bg-gray-100 flex items-center justify-center my-5">
                  <img
                    src={item.product_img || "https://via.placeholder.com/150"}
                    alt={item.product_name || "Product"}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>

                <h3 className="font-bold mt-2">{item.product_name || "No Name"}</h3>
                <p className="text-yellow-600 font-semibold">
                  ₹ {item.price ? item.price.toFixed(2) : "0.00"}
                </p>

                <div className="flex items-center my-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="border px-2 py-1"
                  >
                    -
                  </button>
                  <span className="mx-2">{cart[item._id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="border px-2 py-1"
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-yellow-600 text-white px-4 py-2 w-full rounded-lg flex items-center justify-center"
                  onClick={() => {
                    Add_to_cart(item.product_name, item.price, cart[item._id] || 1);
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </Layout>
  );
};

export default ProductCard;
