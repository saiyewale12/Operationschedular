const mongoose = require("mongoose");

// Schedule Schema
const scheduleSchema = new mongoose.Schema({
  operationId: { type: String, required: true },
  anesthesia: { type: String, required: true },
  operationDate: { type: Date, required: true },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = {
  addSchedule: async (data) => {
    const schedule = new Schedule(data);
    return await schedule.save();
  },
  getSchedules: async () => {
    return await Schedule.find().sort({ operationDate: 1 });
  },
};
