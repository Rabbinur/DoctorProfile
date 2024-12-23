import { useState } from "react";
import Title from "../ui/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../hooks/usefetch";
import { Api } from "../../utils/Api";
import { Link } from "react-router-dom";

const Blogs = () => {
  const type = "blog";
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [modalData, setModalData] = useState(null);

  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["blog", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });

  const blogs = allData?.blogs || [];

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const openModal = (blog) => {
    setModalData(blog);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div id="blog">
      <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 bg-white dark:bg-dark">
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <div data-aos="fade-in" data-aos-delay="200">
                  <Title>Blogs</Title>
                </div>
                <p
                  data-aos="fade-in"
                  data-aos-delay="200"
                  className="text-base pt-10 text-body-color dark:text-dark-6"
                >
                  Here are some blog posts about health.
                </p>
              </div>
            </div>
          </div>
          <div className="fl ex fl ex -wrap grid grid-cols-1 lg:grid-cols-3 gap-10 px-2 lg:px-2">
            {blogs.map((item, i) => (
              <div
                key={i}
                data-aos="fade-in"
                data-aos-delay={i * 100}
                className="w-full px-4  shadow-2xl lg:w- 1/3"
              >
                <div className="w-full mb-10">
                  <div className="mb-5 h-52 overflow-hidden rounded">
                    <img
                      src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                      alt="Blog thumbnail"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="mb-4 text-lg  font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                      {truncateText(item.title,8)}...
                    </h3>
                    <p className="text-base text-body-color dark:text-dark-6">
                      {truncateText(item?.desc, 20)}
                    </p>
                    {item?.desc.split(" ").length > 40 && (
                      <button
                        onClick={() => openModal(item)}
                        className="text-primary underline text-sm mt-2"
                      >
                        Read More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative w-full max-w-3xl p-8 bg-white rounded-lg shadow-2xl">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 bg-gray-200 w-10 h-10 text-gray-700 rounded-full text-xl flex items-center justify-center hover:bg-gray-300"
      >
        ✕
      </button>

      {/* Modal Content */}
      <div className="">
        {/* Image Section */}
        <div className=" w-full">
          <img
            src={`${Api.defaults.baseURL}/uploads/${modalData?.url}`}
            alt={`${modalData?.title}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Text Content Section */}
        <div className=" w-full pt-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {modalData?.title}
          </h2>
          <div className="text-gray-600 
          text-normal leading-relaxed overflow-y-scroll h-48 p-2 border border-gray-200 rounded-lg">
            {modalData?.desc}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Blogs;
