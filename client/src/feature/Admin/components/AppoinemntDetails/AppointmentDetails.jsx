import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import {
  deleteAppointmentData,
  getAppointmentData,
  UpdateAppointmentStatus,
} from "../../../../hooks/usefetch";
import { useDebounce } from "../../hooks/useDebounce";

const AppointmentDetails = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState({
    mobile: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const debouncedSearchParams = useDebounce(searchParams, 500);
  const { mobile } = debouncedSearchParams;

  // Fetch appointment data
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const { page, limit } = pagination;

  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["appointment", mobile, page, limit],
    queryFn: () => {
      return getAppointmentData({ mobile, page, limit });
    },
    keepPreviousData: true
  });
  const appointments = allData?.data || [];
  const totalPages = allData?.totalPages || 1;
  const currentPage = allData?.currentPage || 1;
  //delete appointment
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAppointmentData(id),
    onSuccess: (data, id) => {
      const updatedAppointments = appointments.filter((item) => item._id !== id);

      queryClient.setQueryData(
        ["appointment", mobile, page, limit], // Ensure queryKey matches your query
        (oldData) => ({
          ...oldData,
          data: updatedAppointments, // Update with the filtered data
        })
      );
      // queryClient.invalidateQueries(["appointment", mobile]);
      toast.success("Appointment deleted successfully");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (id, status) => UpdateAppointmentStatus(id, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["appointment", mobile]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 console.log(appointments);

  // Filter appointments to show only today's and the latest data
 
  const latestAppointment = appointments?.length > 0 
  ? [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date))[0] 
  : null;

  return (
    <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl">
      <div className="relative mx-4 mt-4">
        <h3 className="text-lg font-semibold"></h3>
        <form onSubmit={(e) => e.preventDefault()} className="mb-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              name="mobile"
              placeholder="Search by Mobile"
              value={searchParams.mobile}
              onChange={handleChange}
              className="border max-w-full focus:outline-none border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
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
                    "Name",
                    "Mobile",
                    "Email",
                    "Day",
                    "Time",
                    " Date",
                    "Chamber",
                    "Reason",
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
                {appointments?.map((appoint, index) => (
                  <tr key={appoint._id}>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.name}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.mobile}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.email}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.day}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.time}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {new Date(appoint.date).toDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.chamber}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.reason}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200">
                      {appoint.status}
                    </td>
                    <td className="py-2 px-4 border-b border-slate-200 flex gap-2">
                      <button
                        onClick={() => handleEdit(appoint)}
                        className="text-green-500"
                      >
                        <CiEdit size={25} />
                      </button>
                      <button
                       type="button" 
                        onClick={(e) => {
                          e.preventDefault()
                          deleteMutation.mutate(appoint?._id);
                        }}
                        disabled={deleteMutation.isLoading}
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
          <div className="flex  py-5 justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              className={`px-4 py-2 bg- text-black border
                 rounded ${
                currentPage === 1 ? "opacity-80 cursor-not-allowed" 
                : "bg-primary text-white"
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              className={`px-4 py-2 text-black border rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-primary text-white"
              }`}
            >
              Next
            </button>
          </div>
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
  );
};

export default AppointmentDetails;
