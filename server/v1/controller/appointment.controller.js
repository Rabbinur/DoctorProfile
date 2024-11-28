const Holiday = require('./holidayModel');

// Controller for adding a new holiday
exports.addHoliday = async (req, res) => {
  try {
    const newHoliday = new Holiday(req.body);
    const savedHoliday = await newHoliday.save();
    res.status(201).json(savedHoliday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a holiday
exports.updateHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHoliday = await Holiday.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedHoliday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.status(200).json(updatedHoliday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a holiday
exports.deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHoliday = await Holiday.findByIdAndDelete(id);
    if (!deletedHoliday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.status(200).json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
