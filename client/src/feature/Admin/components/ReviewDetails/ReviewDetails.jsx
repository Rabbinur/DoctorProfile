import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import {
  deleteReviewData,
  getReviewData,
  UpdateReviewStatus,
} from "../../../../hooks/usefetch";
import { Api } from "../../../../utils/Api";
const ReviewDetails = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState({
    status: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const debouncedSearchParams = useDebounce(searchParams, 500);
  const { status } = debouncedSearchParams;
 console.log(searchParams.status);
  // Fetch review data
  const { data: allData = [], isFetching } = useQuery({
    queryKey: ["review", status],
    queryFn: () => {
      return getReviewData({ status });
    },
    keepPreviousData:true
  });

  //delete review data
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteReviewData(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["review", status]);
      toast.success("Reveiew deleted successfully");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (id, status) => UpdateReviewStatus(id, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["review", status]);
      setShowModal(false);
      if (data.message) {
        toast.success(data.message);
      }
    },
  });

  const handleEdit = (appointment) => {
    setCurrentAppointment(appointment);
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const { _id, status } = currentAppointment;
    console.log({ _id, status });
    updateMutation.mutate({
      id: _id,
      status: status,
    });
    setShowModal(false);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSearchParams((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      status: value,
    }));
  };
  return (
    <div>
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl">
        <div className="relative mx-4 mt-4">
          <h3 className="text-lg font-semibold"></h3>
          <form onSubmit={(e) => e.preventDefault()} className="mb-4">
            <div className="flex items-center flex- wrap gap-4">
                <div className="">
                <h2>Status:</h2>
                </div>
             <div>
             <select
                placeholder="Status"
                value={searchParams?.status || ""}
                onChange={handleChange}
                className="border p-2 w- full "
              >
                <option value="" >
                 All
                </option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
             </div>
              
            </div>
          </form>

          <div className="overflow-auto h- [400px] ">
            {isFetching ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full mt-4 text-left table-auto min-w-max">
                <thead>
                  <tr>
                    {[
                      "SI",
                      "url",
                      "Name",

                      "rating",
                      "Comments",
                      "Status",
                      "Actions",
                    ].map((item, i) => (
                      <th
                        key={i}
                        className="p-4 
                    border-y border-slate-200 bg-slate-50"
                      >
                        <p
                          className="font-sans text-sm font-normal
                       text-slate-500"
                        >
                          {item}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {allData?.map((review, index) => (
                    <tr key={review._id}>
                      <td className="py-2 px-4 border-b border-slate-200">
                        {index + 1}
                      </td>

                      <td className="py-2 px-4 border-b border-slate-200">
                        <img src={review.url} alt="" />
                        <img
                          src={`${Api.defaults.baseURL}/uploads/${review?.url}`}
                          crossOrigin="anonymous"
                          alt={review?.name}
                          loading="lazy"
                          className="  transition-all 
                      duration-300
                       size-10 rounded group-hover:scale-110"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200">
                        {review.name}
                      </td>
                      {/* <td className="py-2 px-4 border-b border-slate-200">
                        {review.email}
                      </td> */}
                      <td className="py-2 px-4 border-b border-slate-200">
                        {review.rating}
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200">
                        {review.desc}
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200">
                        {review.status}
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200 flex gap-2">
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-green-500"
                        >
                          <CiEdit size={25} />
                        </button>
                        <button
                          onClick={() => {
                            deleteMutation.mutate(review?._id);
                          }}
                          className="text-red-500"
                        >
                          <MdDeleteForever size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
              <h3 className="text-lg font-semibold">Update Appointment</h3>
              <select
                placeholder="Status"
                value={currentAppointment?.status || ""}
                onChange={(e) =>
                  setCurrentAppointment((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="border p-2 w-full mt-4"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleModalSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Status"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetails;
