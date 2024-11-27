// import React, { useState } from "react";
// import Icon from "../ui/Icon/Icon";
// import { toast } from "react-toastify";

// const Calendar = () => {
//   const today = new Date();
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([
//     "10:00 AM",
//     "2:00 PM",
//     "4:00 PM",
//   ]); // Example times
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showBookingForm, setShowBookingForm] = useState(false);

//   const [year, setYear] = useState(today.getFullYear());
//   const [month, setMonth] = useState(today.getMonth());

//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const firstDay = new Date(year, month, 1).getDay();

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];


//   const handleDateClick = (day) => {
//     const dateObject = new Date(year, month, day);
//     const formattedDate = dateObject.toDateString(); // Formats to "Thu Nov 28 2024"
//     setSelectedDate(formattedDate);
//     setIsModalOpen(true);
//     setShowBookingForm(false);
//     setSelectedTime(null);
//   };
  
//   const handleTimeClick = (time) => {
//     setSelectedTime(time);
//     setShowBookingForm(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setShowBookingForm(false);
//     setSelectedTime(null);
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();
  
//     const form = e.target;
//     const name = form.name.value.trim();
//     const contact = form.contact.value.trim();
//     const email = form.email.value.trim();
//     const reason = form.reason.value.trim();
  
//     // Basic validation checks
//     if (!name || !contact  || !reason) {
//       toast.error("All fields are required.");
//       return;
//     }
  
  
//     // Optionally validate contact as a number or add more complex checks
//     if (!/^(01[4-9]\d{8})$/.test(contact)) {
//       toast.error("Contact must be a Bangladeshi number starting with 014, 016, 017, 018, or 019 and containing 11 digits.");
//       return;
//     }
  
//     // If all validation passes, show a success message
//     toast.success("Booking saved successfully");
//     console.log("Booking submitted for:", {
//       selectedDate,
//       selectedTime,
//       name,
//       contact,
//       email,
//       reason,
//     });
  
//     closeModal();
//   };
  
//   // const handleBookingSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   const formData = {
//   //     name: e.target.name.value,
//   //     contact: e.target.contact.value,
//   //     email: e.target.email.value,
//   //     reason: e.target.reason.value,
//   //     selectedDate,
//   //     selectedTime,
//   //   };
  
//   //   try {
//   //     const response = await fetch('/submit-booking', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });
  
//   //     if (response.ok) {
//   //       console.log('Booking submitted successfully');
//   //       closeModal();
//   //     } else {
//   //       console.error('Failed to submit booking');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //   }
//   // };
  
//   const handleMonthChange = (event) => {
//     setMonth(parseInt(event.target.value));
//   };

//   const handleYearChange = (event) => {
//     const newYear = parseInt(event.target.value) || today.getFullYear();
//     setYear(newYear);
//   };
//   const isPastDate = (day) => {
//     const currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0); // Normalize time to midnight for comparison
//     const dateToCheck = new Date(year, month, day);
//     return dateToCheck < currentDate;
//   };
//   const isCurrentDate = (day) => {
//     const currentDate = new Date();
//     return (
//       currentDate.getDate() === day &&
//       currentDate.getMonth() === month &&
//       currentDate.getFullYear() === year
//     );
//   };
//   return (
//     <div className="p-4">
//       {/* Month and Year Filter */}
//       <div
//         className="flex flex-wrap items-center 
//        my-14 gap-4"
//       >
//         <div className="flex items-center gap-2">
//           <label htmlFor="month" className="font-bold">
//             Month:
//           </label>
//           <select
//             id="month"
//             value={month}
//             onChange={handleMonthChange}
//             className="px-3 py-1 border-none bg-gray-100 focus:border-none focus:outline-none rounded"
//           >
//             {months.map((m, index) => (
//               <option key={index} value={index}>
//                 {m}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <label htmlFor="year" className="font-bold ">
//             Year:
//           </label>
//           <input
//             id="year"
//             type="text"
//             value={year}
//             minLength={4}
//             onChange={handleYearChange}
//             className="px-3 py-1 border focus:outline-none rounded w-24"
//           />
//         </div>
//       </div>
//       <div className="pb-5 font-bold text-center underline">
//         <h1>
//           <span>{months[month]} </span> <span>{year}</span>
//         </h1>
//       </div>
//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-2 text-center border-b">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div key={day} className="font-medium border-b hover:text-primary">
//             {day}
//           </div>
//         ))}

//         {Array(firstDay)
//           .fill(null)
//           .map((_, index) => (
//             <div key={index}></div>
//           ))}

//         {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
//           (day) => {
//             const isDisabled = isPastDate(day);
//             const currentDateClass = isCurrentDate(day)
//               ? "bg-blue-500 text-white"
//               : "";
//             return (
//               <button
//                 key={day}
//                 onClick={() => handleDateClick(day)}
//                 disabled={isDisabled}
//                 className={`lg:p-9 rounded border
//                  border-primary/20 -full ${
//                    isDisabled
//                      ? "bg-gray-200  cursor-not-allowed"
//                      : "bg-blue-100 hover:bg-blue-200"
//                  } ${currentDateClass}`}
//               >
//                 {day}
//               </button>
//             );
//           }
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-black"
//             >
//               &times;
//             </button>

//             {!showBookingForm ? (
//               <>
//                 <h2 className="text-lg font-semibold ">
//                   Available Times for {selectedDate} {months[month]}, {year}
//                 </h2>
//                 <p
//                   className="text-lg  mt-3 
//                 mb-2 flex items-center gap-2"
//                 >
//                   Click time for Booking{" "}
//                   <Icon
//                     type="down"
//                     className="text-primary animate-bounce"
//                   ></Icon>{" "}
//                 </p>
//                 <div className="grid gap-3">
//                   {availableTimes.map((time) => (
//                     <button
//                       key={time}
//                       onClick={() => handleTimeClick(time)}
//                       className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <form onSubmit={handleBookingSubmit}>
//                 <h2 className="text-lg font-semibold mb-4">
//                   Book for {selectedTime} on {selectedDate} {months[month]},{" "}
//                   {year}
//                 </h2>
//                 <div className="mb-3">
//                   <label className="block mb-1 text-sm font-medium">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="w-full p-2 border focus:outline-none rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="block mb-1 text-sm font-medium">
//                     Contact
//                   </label>
//                   <input
//                     type="tel"
//                     placeholder="016xxxxxxx"
              
//                     maxLength={11}
//                     name="contact"
//                     className="w-full p-2 border focus:outline-none rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="block">
//                     <span className="block text-sm font-medium text-slate-700">
//                       Email
//                     </span>
//                     <input
//                       type="email"
//                       name="email"
//                       className="peer ... w-full focus:outline-none p-2 border rounded"
//                     />
//                     <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
//                       Please provide a valid email address.
//                     </p>
//                   </label>
//                 </div>
//                 <div className="mb-3">
//                   <label className="block mb-1 text-sm font-medium">
//                     Reason
//                   </label>
//                   <textarea
//                   name="reason"
//                     className="w-full p-2 border focus:outline-none rounded"
//                     required
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Submit Booking
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Calendar;
import React, { useState } from "react";
import Icon from "../ui/Icon/Icon";
import { toast } from "react-toastify";

const schedule = {
  "2024-11-30": ["10:00 AM", "2:00 PM"],
  "2024-11-29": ["11:00 AM", "1:00 PM", "3:00 PM"],
  "2024-11-28": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-21": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-22": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-23": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-24": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-18": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-19": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-0": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-01": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-02": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-03": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-04": ["9:00 AM", "12:00 PM", "5:00 PM"],
  "2024-11-12": ["9:00 AM", "12:00 PM", "5:00 PM"],
};
const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

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

  const handleDateClick = (day) => {
    const formattedDate = new Date(year, month, day);
    const formattedDateString = formattedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    if (!schedule[formattedDateString]) {
      toast.info("This is a weekend; no schedule available.");
      return;
    }

    setAvailableTimes(schedule[formattedDateString]);
    setSelectedDate(day);
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
      toast.error("Contact must be a Bangladeshi number starting with 014, 016, 017, 018, or 019 and containing 11 digits.");
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

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value) || today.getFullYear();
    setYear(newYear);
  };

  const isPastDate = (day) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize time to midnight for comparison
    const dateToCheck = new Date(year, month, day);
    return dateToCheck < currentDate;
  };

  const isCurrentDate = (day) => {
    const currentDate = new Date();
    return (
      currentDate.getDate() === day &&
      currentDate.getMonth() === month &&
      currentDate.getFullYear() === year
    );
  };

  return (
    <div className="p-4">
      {/* Month and Year Filter */}
      <div className="flex flex-wrap items-center my-14 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="month" className="font-bold">Month:</label>
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            className="px-3 py-1 border-none bg-gray-100 focus:border-none focus:outline-none rounded"
          >
            {months.map((m, index) => (
              <option key={index} value={index}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-bold">Year:</label>
          <input
            id="year"
            type="text"
            value={year}
            minLength={4}
            onChange={handleYearChange}
            className="px-3 py-1 border focus:outline-none rounded w-24"
          />
        </div>
      </div>
      <div className="pb-5 font-bold text-center underline">
        <h1><span>{months[month]}</span> <span>{year}</span></h1>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium border-b hover:text-primary">
            {day}
          </div>
        ))}

        {Array(firstDay).fill(null).map((_, index) => <div key={index}></div>)}

        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
          const isDisabled = isPastDate(day);
          const currentDateClass = isCurrentDate(day) ? "bg-blue-500 text-white" : "";
          const date = new Date(year, month, day);
          const formattedDateString = date.toISOString().split('T')[0];

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={`lg:p-9 rounded border border-primary/20
                ${isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-blue-100 hover:bg-blue-200"}
                ${currentDateClass} ${!schedule[formattedDateString] ? "bg-red-500" : ""}`}
            >
              <h1>{day}</h1>
              <p>{!schedule[formattedDateString] ? " weekend " : "Schedule"}</p>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
            {!showBookingForm ? (
              <>
                <h2 className="text-lg font-semibold">
                  Available Times for {selectedDate} {months[month]}, {year}
                </h2>
                <p className="text-lg mt-3 mb-2 flex items-center gap-2">
                  Click time for Booking <Icon type="down" className="text-primary animate-bounce"></Icon>
                </p>
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
           
                <form onSubmit={handleBookingSubmit}>
               <h2 className="text-lg font-semibold mb-4">
Book for {selectedTime} on {selectedDate} {months[month]},{" "}
                  {year}
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
                  <label className="block mb-1 text-sm font-medium">
                    Contact
                  </label>
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
                  <label className="block mb-1 text-sm font-medium">
                    Reason
                  </label>
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
          
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
