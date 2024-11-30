import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png"
import bg from "../../../assets/background.svg"
import { toast } from "react-toastify";

// import { Api } from "../Api/ApiAdmin";



const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
       
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
    } else if (formData.email === "r@gmail.com" && formData.password === "1234@") {
      const user = { email: formData.email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false)
      toast.success("Login successful");
      navigate("/admin");
      setFormData({ email: "", password: "" });
    } else {
      toast.error("Invalid email or password");
    }
   

    // try {
    //   // console.log(formData);
    //   const response = await Api.post(`/user/login`, formData);

    //   if (response.status !== 200) {
    //     throw new Error(`Login failed with status: ${response.status}`);
    //   }

    //   const responseData = response.data;
    //   console.log(responseData);

    //   if (responseData.success === true) {
    //     if (responseData.payload.isVerified === true) {
    //       const {
    //         userId,
    //         isVerified,
    //         role,
    //         token,
    //         first_name,
    //         last_name,
    //         email,
    //         phone,
    //       } = responseData.payload;
         

        

    //       toast("Login Successful");
    //       setTimeout(() => {
    //         navigate("/");
    //       }, 500);
    //     } else {
    //       toast("Please verify your email before logging in.", {
    //         position: "top-center",
    //       });
    //     }
    //   } else {
    //     toast("Login failed. Please check your credentials.", {
    //       position: "top-center",
    //     });
    //   }
    // } catch (error) {
    //   toast(`${error.response.data.message}`, {
    //     position: "top-center",
    //   });
    // } finally {
    //   setLoading(false);
    //   setFormData({
    //     email: "",
    //     password: "",
    //     avatar: "",
    //   });
    // }
  };

  return (
    <div className=" pt-10 max-w-screen-2xl mx-auto">
     
      <div className="min-h-screen bg- white text-gray-900 flex
       justify-center">
        <div className="max-w-screen-2xl m-0 md:m-10 bg- gray-100 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-[50%] xl:w-5/12 sm:w-[75%] w-full p-6 sm:p-12">
            <div className="flex justify-center">
              <img
                src={logo}
                className="w-mx-auto"
              />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex hidden flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    sign In with Cartesian E-mail
                  </div>
                </div>

                <div className="mx-auto lg:max-w-xs">
                  <form
                    onSubmit={handleSubmit}
                    className="max-md:max-w-xl w-full mx-auto"
                  >
                    <div>
                      <label className="block relative">
                        <span className="block text-sm mb-2  text-slate-700">
                          Email <span className="text-red-500">*</span>
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={changeHandler}
                          className="peer relative w-full  peer
                     text-gray-800  
                     text-sm border-b border-gray-300 focus:border-black
                     px-2  py-3 outline-none"
                          placeholder="you@gmail.com"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-[18px] h-[18px] absolute top-10  right-2"
                          viewBox="0 0 682.667 682.667"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              ></path>
                            </clipPath>
                          </defs>
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                          >
                            <path
                              fill="none"
                              strokeMiterlimit="10"
                              strokeWidth="40"
                              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                              data-original="#000000"
                            ></path>
                          </g>
                        </svg>
                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                          Please provide a valid email address.
                        </p>
                      </label>
                    </div>

                    <div className="mt-2">
                      <label className="block text-sm text-gray-600 mb-2">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={changeHandler}
                          required
                          className="w-full text-sm border-b border-gray-300 focus:border-black px-2 py-3 outline-none"
                          placeholder="Enter password"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                          viewBox="0 0 128 128"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            />
                          ) : (
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm-21.7-64.3c-1.6-1.6-4.2-1.6-5.8 0L3.7 56.5c-1.6 1.6-1.6 4.2 0 5.8 1.6 1.6 4.2 1.6 5.8 0l32.8-32.8c1.6-1.6 1.6-4.2 0-5.8z"
                              data-original="#000000"
                            />
                          )}
                        </svg>
                      </div>
                    </div>

                    <div className="flex hidden  flex-wrap items-center justify-between gap-4 mt-6">
                      <div className="flex  items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="text-gray-800 ml-3 block text-sm"
                        >
                          Remember me
                        </label>
                      </div>
                      <div>
                        <Link
                          to="/request-reset-password"
                          className="text-primary font-semibold text-sm hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <div className="mt-12">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-md flex justify-center mx-auto shadow
                   py-2.5 px-5 text-sm font-semibold rounded-md border border-[#8C6E42]
                    hover:text-white  hover:bg-black
                    bg-transparent text-black focus:outline-none"
                      >
                        {loading ? "Signing in..." : "Sign in"}
                      </button>
                      <p className="text-gray-800 hidden text-sm text-center mt-6">
                        Don't have an account{" "}
                        <Link
                          to="/sign-up"
                          className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap"
                        >
                          Register here
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  `url(${bg})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;