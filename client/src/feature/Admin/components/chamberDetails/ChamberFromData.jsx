import React, { useState, useEffect } from "react";
import { createChambar, getChamberData, updateChamber } from "../../../../hooks/usefetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ChamberForm = ({ selectedId, setSelectedItem }) => {
  const queryClient = useQueryClient();

  // Fetch all chamber data
  const { data, isFetching } = useQuery({
    queryKey: ["chamber"],
    queryFn: getChamberData,
  });

  const allData = data || [];

  // Initialize form data
  const [formData, setFormData] = useState({
    chamber: "",
    address: "",
    schedule: [{ day: "", time: [""] }],
  });

  // Set formData for editing when selectedId changes
  useEffect(() => {
    if (selectedId) {
      const chamberToEdit = allData.find((item) => item._id === selectedId);
      if (chamberToEdit) {
        setFormData(chamberToEdit);
      }
    } else {
      setFormData({
        chamber: "",
        address: "",
        schedule: [{ day: "", time: [""] }],
      });
    }
  }, [selectedId]);

  // Create mutation
  const addMutation = useMutation({
    mutationFn: (data) => createChambar(data),
    onSuccess: () => {
      setFormData({
        chamber: "",
        address: "",
        schedule: [{ day: "", time: [""] }],
      });
      queryClient.invalidateQueries(["chamber"]);
      toast.success("Chamber created successfully");
      setSelectedItem("details");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Failed to create chamber";
      toast.error(errorMessage);
    },
  });
  
  // Edit mutation
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => updateChamber(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["chamber"]);
      toast.success("Chamber updated successfully");
    
    },
    onError: (error) => {
      console.error("Error Details:", error);
      const errorMessage = error.response?.data?.message || "Failed to update chamber";
      toast.error(errorMessage);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule[index][field] = value;
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  const handleTimeChange = (index, timeIndex, value) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule[index].time[timeIndex] = value;
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: "", time: [""] }],
    });
  };

  const addTime = (index) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule[index].time.push("");
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  const removeSchedule = (index) => {
    const updatedSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    if (selectedId) {
      editMutation.mutate({ id: selectedId, data: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {selectedId ? "Update Chamber" : "Create Chamber"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="chamber">
            Chamber Name
          </label>
          <input
            type="text"
            id="chamber"
            name="chamber"
            required
            value={formData.chamber}
            onChange={handleInputChange}
            placeholder="Enter chamber name"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Schedule</h3>
          {formData.schedule.map((schedule, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <input
                  type="text"
                  placeholder="Day (e.g., Monday)"
                  value={schedule.day}
                  onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
                  className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div>
                {schedule.time.map((time, timeIndex) => (
                  <div key={timeIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Time (e.g., 09:00 AM)"
                      value={time}
                      onChange={(e) => handleTimeChange(index, timeIndex, e.target.value)}
                      className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => addTime(index)}
                      className="ml-4 text-blue-500 hover:text-blue-700"
                    >
                      + Add Time
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSchedule}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            + Add Schedule
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-semibold"
        >
          {selectedId ? "Update Chamber" : "Create Chamber"}
        </button>
      </form>
    </div>
  );
};

export default ChamberForm;
