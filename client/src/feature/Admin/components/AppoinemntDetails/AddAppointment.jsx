import React, { useState } from 'react';
import axios from 'axios';

const AddAppointment = () => {
  const [holidayData, setHolidayData] = useState({
    _id: '',
    month: '',
    year: '',
    holiday_list: [
      {
        date: '',
        name: '',
        time: [''],
        _id: ''
      }
    ]
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedData = { ...holidayData };

    if (field) {
      // Nested field (e.g., `holiday_list[0].name`)
      updatedData[field][index][name] = value;
    } else {
      updatedData[name] = value;
    }

    setHolidayData(updatedData);
  };

  const handleAddTime = (index) => {
    const updatedData = { ...holidayData };
    updatedData.holiday_list[index].time.push('');
    setHolidayData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add-holiday', holidayData);
      console.log('Response:', response.data);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <div>
      <h1>Holiday Data Form</h1>
      <div>
        <label>Month:</label>
        <input
          type="text"
          name="month"
          value={holidayData.month}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          name="year"
          value={holidayData.year}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <h2>Holiday List</h2>
        {holidayData.holiday_list.map((holiday, index) => (
          <div key={index}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={holiday.name}
                onChange={(e) => handleChange(e, index, 'holiday_list')}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={holiday.date}
                onChange={(e) => handleChange(e, index, 'holiday_list')}
              />
            </div>
            <div>
              <label>Time:</label>
              {holiday.time.map((time, timeIndex) => (
                <div key={timeIndex}>
                  <input
                    type="text"
                    name="time"
                    value={time}
                    onChange={(e) => {
                      const updatedTime = [...holiday.time];
                      updatedTime[timeIndex] = e.target.value;
                      handleChange({ target: { name: 'time', value: updatedTime } }, index, 'holiday_list');
                    }}
                  />
                </div>
              ))}
              <button onClick={() => handleAddTime(index)}>Add Time</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddAppointment;
