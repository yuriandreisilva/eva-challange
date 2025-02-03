const Journey = require("../models/Journey");
const mongoose = require("mongoose");

class JourneyService {
  static async create(data) {
    const { error } = Journey.validateData(data);
    if (error) throw new Error(error.details[0].message);
  
    if (data.category_id && typeof data.category_id === 'string') {
      data.category_id = new mongoose.Types.ObjectId(data.category_id);
    }
  
    return await Journey.create(data);
  }
  

  static async getAll() {
    return await Journey.find().populate('category_id').exec();
  }
  
  static async getById(id) {
    return await Journey.findById(id).populate('category_id').exec();
  }
  

  static async update(id, data) {
    const { error } = Journey.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await Journey.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Journey.findByIdAndDelete(id);
  }
}

module.exports = JourneyService;
