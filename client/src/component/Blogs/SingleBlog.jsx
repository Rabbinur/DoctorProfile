import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllBlogs } from "../../hooks/usefetch";
import { Api } from "../../utils/Api";
import Container from "../ui/Container/Container";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const SingleBlog = () => {
  const { id } = useParams();
  const type = "blog";
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["blog", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });

  const blogs = allData?.blogs || [];
  const singleBlog = blogs.find((item) => item._id === id);

  const shareUrl = window.location.href; // Get the current URL
  const title = singleBlog?.title;

  return (
    <div>
      <Container>
        <div
          style={{
            backgroundImage: `url(${Api.defaults.baseURL}/uploads/${singleBlog?.url})`,
          }}
          className="bg-cover object-contain bg-no-repeat bg-center h-[40vh] lg:h-[75vh] w-full"
        ></div>

        <section className="container mx-auto">
          <article>
            <header className="pt-10 text-center">
              <p className="text-gray-500">
                Published{" "}
                {singleBlog &&
                  new Date(singleBlog?.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </p>
              <h1 className="mt-2 text-xl lg:text-4xl font-bold text-gray-900 sm:text-5xl">
                {singleBlog?.title}
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                You're reading the blogs of {singleBlog?.category}
              </p>
            </header>

            <div className="mt-10 space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
              <strong className="text-2xl font-medium">
                {singleBlog?.subtitle}
              </strong>
              <p>{singleBlog?.desc}</p>
            </div>
          </article>

          <div className="flex justify-center mt-10 space-x-4">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>

          <aside aria-label="Related Articles" className="mt-10 py-20">
            <h2 className="mb-8 text-center hidden text-xl lg:text-3xl font-bold text-gray-900">
              More Blogs
            </h2>
          </aside>
        </section>
      </Container>
    </div>
  );
};

export default SingleBlog;
