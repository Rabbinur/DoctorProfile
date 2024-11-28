import React from "react";

const MonthYearFIlter = ({
  months,
  handleMonthChange,
  handleYearChange,
  month,
  year,
}) => {
  return (
    <div>
      <div className="flex flex-wrap items-center my-14 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="month" className="font-bold">
            Month:
          </label>
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            className="px-3 py-1 border-none bg-gray-100 focus:border-none focus:outline-none rounded"
          >
            {months.map((m, index) => (
              <option key={index} value={index}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-bold">
            Year:
          </label>
          <input
            id="year"
            type="text"
            value={year}
            onChange={handleYearChange}
            className="px-3 py-1 border focus:outline-none rounded w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MonthYearFIlter;
