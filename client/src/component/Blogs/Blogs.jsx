import React, { useState } from "react";
import Title from "../ui/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../hooks/usefetch";
import { Api } from "../../utils/Api";
import { Link } from "react-router-dom";

const Blogs = () => {
  const type = "blog";
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

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

  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
          <div className="flex flex-wrap gap-10 px-2">
            {blogs.map((item, i) => (
              <div
                key={i}
                data-aos="fade-in"
                data-aos-delay={i * 100}
                className="w-full px-4 md:w-1/2 shadow-2xl lg:w-1/3"
              >
                <div className="w-full mb-10">
                  <div className="mb-8 overflow-hidden rounded">
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
                    <h3>
                      <Link
                        to=""
                        className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-base text-body-color dark:text-dark-6">
                      {expanded[i]
                        ? item?.desc
                        : truncateText(item?.desc, 50)}
                    </p>
                    <button
                      onClick={() => toggleReadMore(i)}
                      className="text-primary underline text-sm mt-2"
                    >
                      {expanded[i] ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
