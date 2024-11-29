import React, { useState } from "react";
import Container from "../ui/Container/Container";
import Title from "../ui/Title/Title";
import img1 from "../../assets/pls-40.jpg";
import Calendar from "../BookingCalendar/BookingCalendar";
import { toast } from "react-toastify";
import Icon from "../ui/Icon/Icon";

const Appointment = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Date from the calendar

  // Time slots for selection
  const timeSlots = [
    "6-7 pm",
    "7-8 pm",
    "8-9 pm",
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    reason: "",
  });

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
  const today = new Date().toISOString().split("T")[0];
  // Handle form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    const { name, contact, reason } = formData;
    if (!name || !contact || !reason) {
      toast.error("All fields are required.");
      return;
    }

    // Validate the contact number for Bangladesh (11-digit number starting with 01 followed by 4-9 and 8 more digits)
    if (!/^(01[4-9]\d{8})$/.test(contact)) {
      toast.error(
        "Contact must be a Bangladeshi number starting with 014, 016, 017, 018, or 019 and containing 11 digits."
      );
      return;
    }

    // Show success message if all validations pass
    toast.success("Booking saved successfully");
    setFormData({
      name: "",
      contact: "",
      email: "",
      reason: "",
    });
    setSelectedDate("");
    setSelectedTime("");
    console.log({ ...formData, date: selectedDate, time: selectedTime });
return
    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, date: selectedDate, time: selectedTime }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking successful:", result);
        toast.success("Booking successful!");
        // Reset form after successful submission
        setFormData({
          name: "",
          contact: "",
          email: "",
          reason: "",
        });
        setSelectedDate("");
        setSelectedTime("");
      } else {
        const error = await response.json();
        console.error("Error booking appointment:", error);
        toast.error("An error occurred while booking. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please check your internet connection.");
    }
  };

  return (
    <div id="appointment">
      <Container>
        <Title>Book Your Appointment</Title>
        <div className="py-20 
        grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="grid grid-cols-1 
          md:grid-cols-1 gap-10">
          
          <div
            className="p-[50px] text-center text-white"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h3 className="pb-5 underline font-bold
              text-xl text-white">Timing</h3>
            <ul className="space-y-2">
              <li>Monday ... 06.00 - 09.00 pm</li>
              <li>Friday ... 06.00 - 09.00 pm</li>
              <li>Saturday ... 06.00 - 09.00 pm</li>
              <li>Tuesday ... 06.00 - 09.00 pm</li>
              <li className="text-yellow-500 font-bold">Sunday ... Weekend ...</li>
            </ul>
          </div>     
          
          <div
            className="text-center bg-white 
          lg:p-10 p-5 shadow-2xl"
          >
            <div className=" hover:bg-primary lg:size-16 size-10  flex justify-center items-center rounded-full mx-auto group border-primary  border  duration-500">
              <Icon
                type={"map"}
                className="text-2xl group-hover:text-white text-primary   "
              />
            </div>
            <h2 className="font-oswald capitalize md:text-xl text-base lg:py-4 py-2">
              Chamber address
            </h2>
            <p className="text-gray-500 text-sm">Road-2, Mirpur-2, Dhaka</p>
          </div>
          </div>
         


          <div className="p-10 shadow-2xl">
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border focus:outline-none rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Contact</label>
                <input
                  type="tel"
                  placeholder="016xxxxxxx"
                  maxLength={11}
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-2 border focus:outline-none rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full focus:outline-none p-2 border rounded"
                  />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Book for {selectedTime ? `Time: ${selectedTime}` : "Select a time"} on {selectedDate ? selectedDate : "Select a date"}
                </h2>
                <div className="mb-3">
                  <label className="block mb-1 text-sm font-medium">Preferred Time</label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`px-4 py-2 border rounded ${
                          selectedTime === time ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={selectedDate}
                  min={today}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border focus:outline-none rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-2 border focus:outline-none rounded"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Booking
              </button>
            </form>
          </div>
        </div>
        <div className="hidden">
          {/* <FullCalendar /> */}
          <Calendar />
        </div>
      </Container>
    </div>
  );
};

export default Appointment;
