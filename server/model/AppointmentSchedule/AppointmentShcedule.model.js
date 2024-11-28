const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  holiday_list: [
    {
      date: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      time: [String]
    }
  ]
});

module.exports = mongoose.model('Holiday', holidaySchema);
