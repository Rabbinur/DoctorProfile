import React from 'react';

const AppoinmentForm = ({ selectedTime, selectedDate,setSelectedDate, formData, handleChange, handleBookingSubmit }) => {
    return (
        <div>
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
                        name="mobile"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                        className="w-full p-2 border focus:outline-none rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Email (Optional)</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
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
                </div>
                <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={selectedDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2 border focus:outline-none rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium">Reason</label>
                    <textarea
                        name="reason"
                        value={formData.reason || ""}
                        onChange={handleChange}
                        className="w-full p-2 border focus:outline-none rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white rounded shadow hover:bg-gray-500"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default AppoinmentForm;
