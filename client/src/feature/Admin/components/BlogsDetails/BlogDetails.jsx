import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteBlog, getAllBlogs } from "../../../../hooks/usefetch";
import BlogFormData from "./BlogFromData";
import { Api } from "../../../../utils/Api";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const queryClient = useQueryClient();
  const type = "blog";
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["blog", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });
  const blogs = allData?.blogs || [];
  const pagination = allData?.pagination || {};
  const { total, page: currentPage } = pagination;
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: (id) => {
      const updatedBlogs = blogs.filter((item) => item._id !== id);

      //   queryClient.setQueryData(
      //     ["blog", type, page, limit],
      //     (oldData) => ({
      //       ...oldData,
      //       data: updatedBlogs, // Update with the filtered data
      //     })
      //   );
      queryClient.invalidateQueries(["blog", type, page, limit]);
      toast.success("Blog deleted successfully");
    },
  });
  console.log(blogs);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (blog) => {
    setBlogToEdit(blog);
    setShowModal(true);
  };

  //   const handlePageChange = (direction) => {
  //     setCurrentPage((prev) => Math.max(1, prev + direction));
  //   };
  const totalPages = Math.ceil(total / limit);
  return (
    <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {blogs?.map((item) => (
              <div key={item._id} className="border">
                <div className="h-40">
                  <img
                    src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                    // crossOrigin="anonymous"
                    alt={item?.name}
                    loading="lazy"
                    className=" w-full h-40 object-cover transition-all 
                      duration-300
                        rounded group-hover:scale-110"
                  />
                </div>
                <div className="py-5 p-3">
                  <h1 className="font-bold"> {item.title}</h1>
                  <h2 className="py-1">{item.category}</h2>
                  <p className=""> {item.desc}</p>

                  <div className="py-2 pt-5 flex gap-5">
                    <button
                      className="border border-gray-200 p-1"
                      onClick={() => handleEdit(item)}
                    >
                      <CiEdit size={30} className="text-primary" />
                    </button>
                    <button
                      className="border border-gray-200 p-1 bg-white -400"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteMutation.mutate(item?._id);
                      }}
                      disabled={deleteMutation.isLoading}
                    >
                      <MdDeleteForever size={30} className="text-red-500" />
                    </button>
                    <Link to=""></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-5">
            <button
              className="border px-4 py-2"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              className="border px-4 py-2"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <BlogFormData
              blogToEdit={blogToEdit}
              onClose={() => {
                setShowModal(false);
                setBlogToEdit(null);
              }}
            />
            <button
              className="absolute bottom-11 right-[15%] border px-2 py-1"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
