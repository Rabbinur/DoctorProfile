import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "../ui/Container/Container";
import image from "../../assets/map.png";
import user from "../../assets/user.jpeg";
import { toast } from "react-toastify";

const feedback = [
  {
    name: "Md Rabbinur Muktar",
    desc: "A smile adorns a person. I am glad that I can decorate people even in this way. Dentistry is not expensive, neglect is Being a famous designer is like being a famous dentist.",
  },
  {
    name: "Rabbinur Muktar",
    desc: "A smile adorns a person. I am glad that I can decorate people even in this way. Dentistry is not expensive, neglect is Being a famous designer is like being a famous dentist.",
  },
];

const Testomonial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    toast.success("Successfully Submit your  review")
    setIsModalOpen(false); // Close the modal after submission
    setFormData({ name: "", email: "", rating: "", comments: "" }); // Reset form
  };

  return (
    <div
      className="py-20"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <div>
          <Swiper
            className="relative group"
            modules={[Autoplay]}
            autoplay={true}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {feedback.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="max-w-2xl text-center mx-auto group border-gray-300 shadow-sm px-3 py-6 rounded-md duration-300 cursor-pointer">
                  <img
                    src={user}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full mx-auto group-hover:scale-105 duration-300"
                  />
                  <h1 className="text-lg text-center font-medium mt-4 mb-2 group-hover:text-[#85b839] duration-300">
                    {item.name}
                  </h1>
                  <p>{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <div className="max-w-2xl mx-auto py-10">
            {/* Appointment Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="border font-medium uppercase
               border-primary group relative px-4 py-2 
                text-primary transition-colors duration-[400ms] hover:bg-primary hover:text-white"
              >
                Write Review Here
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Full Name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Select Rating
                  </option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="4"
                  placeholder="Enter comments"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testomonial;
