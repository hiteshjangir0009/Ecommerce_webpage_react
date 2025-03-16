import { useState } from "react";
import Cookies from "js-cookie";
import { API_url, PostAPI } from "../../Utils/API_config";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Store token in cookies
  const storeToken = (token) => {
    Cookies.set("Access_token", token, { expires: 7 }); // Token expires in 7 days
    
  };

  // Sign Up API
  const SignUpAPI = async () => {
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);

    try {
      const response = await PostAPI(API_url.Register, formdata);

      if (response.success) {
        storeToken(response.token);
        setIsSignUp(false)
        console.log("Sign-up successful:", response);
      } else {
        console.error("Sign-up failed:", response.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  // Sign In API
  const SignInAPI = async () => {
    const formdata = new FormData();
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);

    try {
      const response = await PostAPI(API_url.Login, formdata);
      console.log("resp ==>>", response);
      
      if (response.success) {
        storeToken(response.data.Access_token);
        console.log("Sign-in successful:", response);
        navigate('/')

      } else {
        if (response.message === "user not exist") {
          alert("User not found! Please register yourself.");
        } else {
          alert(response.message || "Login failed! Please try again.");
        }
        console.error("Sign-in failed:", response.message);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("An error occurred while signing in. Please try again later.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            isSignUp ? SignUpAPI() : SignInAPI();
          }}
        >
          {isSignUp && (
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
