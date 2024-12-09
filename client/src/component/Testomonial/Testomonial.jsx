import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Api } from "../../utils/Api";
import Container from "../ui/Container/Container";
import image from "../../assets/map.png";
import user from "../../assets/user.jpeg";
import { toast } from "react-toastify";
import Icon from "../ui/Icon/Icon";
import { useMutation } from "@tanstack/react-query";
import { createReview, getReviewData } from "../../hooks/usefetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Testimonial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    desc: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const status = "Approved";
  const { data, isFetching } = useQuery({
    queryKey: ["review", status],
    queryFn: () => {
      return getReviewData({ status });
    },
  });

  const feedback = data || [];
  console.log(feedback);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "rating" ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Generate a preview URL for the image
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    }
  };

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (formData) => createReview(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["review", status]);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", rating: "", desc: "" });
      setFile(null);
      setPreviewUrl("");
      if (data.message) {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong"); // Display error toast
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append file data
    if (file) {
      formDataToSend.append("url", file);
    }
    console.log("Form Data:", formDataToSend);
    addMutation.mutate(formDataToSend);
    // toast.success("Successfully submitted your review");
    // setIsModalOpen(false);
    // setFormData({ name: "", email: "", rating: "", comments: "" });
  };

  return (
    <div
      id="reviews"
      className="py-20"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        {/* Swiper Section */}
        <div>
          <Swiper
            className="relative group"
            modules={[Autoplay]}
            autoplay={true}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {feedback.map((item, i) => {
              console.log(item.url);
              return (
                <SwiperSlide key={i} data-aos="fade-in"
                data-aos-delay="300">
                  <div   className="max-w-2xl text-center mx-auto group border-gray-300 shadow-sm px-3 py-6 rounded-md duration-300 cursor-pointer">
                    {/* <img
                 r     srcSet={`${
                        item?.url?.includes("/static/")
                          ? item?.url
                          : `${Api.defaults.baseURL}/uploads/${item?.url}`
                      } 1x,
    ${
      item?.url?.includes("/static/")
        ? item?.url
        : `${Api.defaults.baseURL}/uploads/${item?.url}`
    } 2x`}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      src={
                        item?.url?.includes("/static/")
                          ? item?.url
                          : `${Api.defaults.baseURL}/uploads/${item?.url}`
                      }
                      alt={item?.name}
                      loading="lazy"
                      className="object-cover w-full transition-all duration-300 h-52 md:h-56 lg:h-80 rounded-xl group-hover:scale-110"
                    /> */}
                   <div className="flex justify-center">
                   <img
                      src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                    // crossOrigin="anonymous"
                      alt={item?.name}
                      loading="lazy"
                      className="  transition-all 
                      duration-300
                       size-20 rounded-full group-hover:scale-110"
                    />
                   </div>

                    <p className="flex gap-2 items-center justify-center py-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          <Icon
                            type="star"
                            className={`${
                              i < item.rating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />
                        </span>
                      ))}
                    </p>
                    <h1 className="text-lg font-medium mt-4 mb-2 group-hover:text-primary duration-300">
                      {item.name}
                    </h1>
                    <p>{item.desc}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Write Review Button */}
        <div data-aos="fade-in"
          data-aos-delay="400" className="max-w-2xl mx-auto py-10">
          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border font-medium uppercase border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Write Review Here
            </button>
          </div>
        </div>
      </Container>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Write a Review
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="file"
                  name="url"
                  value={formData.url}
                  onChange={handleFileChange}
                  required
                  placeholder="Enter Full Name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                {previewUrl && (
                  <div style={{ margin: "10px 0" }}>
                    <p>Image Preview:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "50px" }}
                    />
                  </div>
                )}
              </div>
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
              <div className="hidden">
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
                <label className="block text-sm font-medium mb-1">
                  Comments
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
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

export default Testimonial;
