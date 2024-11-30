import React, { useState } from "react";
import { toast } from "react-toastify";
import { format, isPast, isToday, parseISO } from "date-fns";

import Formdata from "./Formdata";
import MonthYearFIlter from "./MonthYearFIlter";
import { data } from "../../constants/constants";

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter data for the selected month and year
  const currentMonthData = data?.find(
    (item) => parseInt(item.month) === month + 1 && parseInt(item.year) === year
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const selectedDateObj = new Date(year, month, day);
    const formattedDateString = format(selectedDateObj, "yyyy-MM-dd");

    const holidayData = currentMonthData?.holiday_list.find(
      (holiday) =>
        format(parseISO(holiday.date), "yyyy-MM-dd") === formattedDateString
    );
    if (!holidayData) {
      toast.info("No schedule set yet");
    } else if (holidayData.name === "") {
      toast.info("No schedule available");
    } else if (holidayData.name === "weekend") {
      toast.info("This is a weekend");
      return;
    }

    setAvailableTimes(holidayData.time);
    setSelectedDate(selectedDateObj);
    setIsModalOpen(true);
    setShowBookingForm(false);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowBookingForm(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowBookingForm(false);
    setSelectedTime(null);
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value) || today.getFullYear();
    setYear(newYear);
  };

  const isPastDate = (day) => {
    const dateToCheck = new Date(year, month, day);
    return isPast(dateToCheck);
  };

  const isCurrentDate = (day) => {
    const dateToCheck = new Date(year, month, day);
    return isToday(dateToCheck);
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const contact = form.contact.value.trim();
    const email = form.email.value.trim();
    const reason = form.reason.value.trim();

    // Basic validation checks
    if (!name || !contact || !reason) {
      toast.error("All fields are required.");
      return;
    }

    // Optionally validate contact as a number or add more complex checks
    if (!/^(01[4-9]\d{8})$/.test(contact)) {
      toast.error(
        "Contact must be a Bangladeshi number starting with 014, 016, 017, 018, or 019 and containing 11 digits."
      );
      return;
    }

    // If all validation passes, show a success message
    toast.success("Booking saved successfully");
    console.log("Booking submitted for:", {
      selectedDate,
      selectedTime,
      name,
      contact,
      email,
      reason,
    });

    closeModal();
  };

  return (
    <div className="p-4">
      {/* Month and Year Filter */}
      <div>
        <MonthYearFIlter
          months={months}
          handleMonthChange={handleMonthChange}
          handleYearChange={handleYearChange}
          month={month}
          year={year}
        />
      </div>

      <div className="pb-5 font-bold text-center underline">
        <h1>
          {months[month]} {year}
        </h1>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium border-b hover:text-primary">
            {day}
          </div>
        ))}

        {Array(firstDay)
          .fill(null)
          .map((_, index) => (
            <div key={index}></div>
          ))}

        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day) => {
            const date = new Date(year, month, day);
            const formattedDateString = format(date, "yyyy-MM-dd");

            const holidayData = currentMonthData?.holiday_list.find(
              (holiday) =>
                format(parseISO(holiday.date), "yyyy-MM-dd") ===
                formattedDateString
            );

            const isDisabled = isPastDate(day);
            const currentDateClass = isCurrentDate(day)
              ? "bg-blue-500 text-white"
              : "";
            const holidayClass =
              holidayData?.name === "weekend" ? "bg-red-500" : "";

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={isDisabled}
                className={`lg:p-9 rounded border border-primary/20
                ${
                  isDisabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-100 hover:bg-blue-200"
                }
                ${currentDateClass} ${holidayClass}`}
              >
                <h1>{day}</h1>
                <p>{holidayData?.name}</p>
              </button>
            );
          }
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &times;
            </button>
            {!showBookingForm ? (
              <>
                <h2 className="text-lg font-semibold">
                  Available Times for {format(selectedDate, "do MMMM yyyy")}
                </h2>
                <div className="grid gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <Formdata
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  month={months[month]}
                  year={year}
                  handleBookingSubmit={handleBookingSubmit}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
