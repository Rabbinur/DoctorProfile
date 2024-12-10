import React, { useState } from "react";
import Container from "../ui/Container/Container";
import Title from "../ui/Title/Title";
import img1 from "../../assets/pls-40.jpg";
import Calendar from "../BookingCalendar/BookingCalendar";
import { toast } from "react-toastify";
import Icon from "../ui/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getChamberData } from "../../hooks/usefetch";
import { Api } from "../../utils/apiClient"; // Ensure this is correctly imported
import AppoinmentForm from "./AppoinmentForm";

const Appointment = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedChamber, setSelectedChamber] = useState("");
  const [activeChamber, setActiveChamber] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    reason: "",
  });

  // Fetch chamber data
  const { data, isFetching } = useQuery({
    queryKey: ["chamber"],
    queryFn: getChamberData,
  });

  const allData = data || [];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date selection from the Calendar component
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Set the selected chamber and update formData
  const handleChamberSelect = (chamber) => {
    setSelectedChamber(chamber);
    setActiveChamber(chamber.chamber);
    setSelectedDay("");
    setFormData({ ...formData, chamber: chamber.chamber });
  };

  // Set the selected day
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const today = new Date().toISOString().split("T")[0];

  // Handle form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    const { name, mobile, reason, chamber } = formData;
    const updatedData = {
      ...formData,
      day: selectedDay,
      date: selectedDate,
      time: selectedTime,
    };
    console.log(updatedData);
    if (
      !name ||
      !mobile ||
      !reason ||
      !chamber ||
      !selectedDate ||
      !selectedTime
    ) {
      toast.error("All fields are required.");
      return;
    }

    // Validate the contact number for Bangladesh
    if (!/^(01[4-9]\d{8})$/.test(mobile)) {
      toast.error(
        "Contact must be a Bangladeshi number starting with 014, 016, 017, 018, or 019 and containing 11 digits."
      );
      return;
    }

    try {
      const response = await Api.post("/appointment/create", {
        updatedData,
      });
      console.log(response);
      if (response.data.success === true) {
        toast.success(response.data.message);
        // Reset form after successful submission
        setFormData({
          name: "",
          mobile: "",
          email: "",
          reason: "",
          chamber: "",
        });
        setSelectedDate("");
        setSelectedDay("");
        setSelectedTime("");
        setSelectedChamber("");
        setActiveChamber("");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please check your internet connection.");
    }
  };

  return (
    <div id="appointment">
      <Container>
        <div data-aos="fade-in" data-aos-delay="300">
          <Title>Book Your Appointment</Title>
        </div>

        <div className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
            <div
              className="p- [20px]  text-white"
              style={{
                // backgroundImage: `url(${img1})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <h3
                data-aos="fade-in"
                data-aos-delay="200"
                className="pb-5 underline
               font-bold text-center text-2xl text-black"
              >
                Timing
              </h3>

        

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {allData.map((chamber, i) => (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 150}
                    className="relative bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                  >
                    {/* Chamber Header */}
                    <div className="p-4 bg-blue-500 text-white text-center">
                      <h2 className="font-bold text-lg uppercase tracking-wider">
                        {chamber.chamber}
                      </h2>
                    </div>

                    {/* Chamber Schedule */}
                    <div className="p-5">
                      {chamber.schedule.map((scheduleItem, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                            <p className="font-semibold text-gray-700 underline">
                              {scheduleItem.day}
                            </p>
                          </div>
                          <ul className="list-inside list-disc ml-4 text-gray-600">
                            {scheduleItem.time.map((timeSlot, idx) => (
                              <li key={idx} className="text-sm">
                                {timeSlot}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className=" py-4 text-center text-black ">
                  <h1 className="font-bold flex gap-2 justify-center text-[18px]">
                  <Icon
                      type={"map"}
                      className="text-2xl group-hover:text-white text-primary"
                    /> Chamber Address
                  </h1>
                  <p className="">{chamber?.address}</p>
                </div>

                    {/* Decorative Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-100 opacity-20 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
{/* 
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-center grid grid-cols-1 md:grid-cols-4 gap-5  bg-white lg:p-10 p-5 shadow-2xl"
            >
              {allData.map((item, i) => (
                <div key={i}>
                  <div className="hover:bg-primary lg:size-16 size-10 flex justify-center items-center rounded-full mx-auto group border-primary border duration-500">
                    <Icon
                      type={"map"}
                      className="text-2xl group-hover:text-white text-primary"
                    />
                  </div>
                  <h2 className="font-oswald capitalize md:text-md text-base lg:py-4 py-2">
                    Chamber address
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {item.address || "Address not available"}
                  </p>
                </div>
              ))}
            </div> */}
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="px-10 py-5  shadow-2xl"
          >
            <h1 className="capitalize text-2xl underline text-center  font-bold pb-5">
              Booking Form
            </h1>
            <h1 className="capitalize pb-2 text-md font-bold">
              Select chamber
            </h1>
            <div className="flex flex-wrap gap-3 ">
              {allData.map((chamber, i) => (
                <button
                  className={`${
                    activeChamber === chamber.chamber
                      ? "bg-primary text-white"
                      : "text-black bg-white"
                  }  p-2 border`}
                  key={i}
                  onClick={() => handleChamberSelect(chamber)}
                >
                  {chamber.chamber}
                </button>
              ))}
            </div>

            {selectedChamber && selectedChamber.schedule && (
              <div className="py-2">
                <h3 className="font-bold py-2">Available Days</h3>
                <div className="flex flex-wrap gap-5">
                  {selectedChamber.schedule.map((appoint, i) => (
                    <button
                      key={i}
                      onClick={() => handleDaySelect(appoint.day)}
                      className={`px-4 py-2 border rounded ${
                        selectedDay === appoint.day
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {appoint.day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDay && (
              <div className="py-5">
                <h3 className="font-bold pb-2">
                  Available Times for {selectedDay}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedChamber.schedule
                    .find((appoint) => appoint.day === selectedDay)
                    ?.time?.map((time, i) => (
                      <button
                        key={i}
                        onClick={() => handleTimeSelect(time)}
                        className={`px-4 py-2 border rounded ${
                          selectedTime === time
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                </div>
              </div>
            )}
            <div className="py-5">
              <AppoinmentForm
                selectedTime={selectedTime}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                formData={formData}
                handleChange={handleChange}
                handleBookingSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Appointment;
