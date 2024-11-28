import React from "react";

const Formdata = ({
  handleBookingSubmit,
  selectedDate,
  selectedTime,
  month,
  year,
}) => {
  // Convert selectedDate to a string if it's a Date object
  const formattedDate = selectedDate instanceof Date ? selectedDate.toDateString() : selectedDate;

  return (
    <div>
      <form onSubmit={handleBookingSubmit}>
        <h2 className="text-lg font-semibold mb-4">
          Book for {selectedTime} on {formattedDate} {month}, {year}
        </h2>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
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
            className="w-full p-2 border focus:outline-none rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              name="email"
              className="peer ... w-full focus:outline-none p-2 border rounded"
            />
            <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
          </label>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Reason</label>
          <textarea
            name="reason"
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
  );
};

export default Formdata;
