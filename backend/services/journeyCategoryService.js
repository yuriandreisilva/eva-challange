const JourneyCategory = require("../models/JourneyCategory");

class JourneyCategoryService {
  static async create(data) {
    const { error } = Journey.validateData(data);
    if (error) throw new Error(error.details[0].message);
  
    const category = await JourneyCategory.findById(data.category_id);
    if (!category) {
      throw new Error('Categoria não encontrada!');
    }
  
    if (data.category_id && typeof data.category_id === 'string') {
      data.category_id = mongoose.Types.ObjectId(data.category_id);
    }
  
    return await Journey.create(data);
  }

  static async getAll() {
    return await JourneyCategory.find();
  }

  static async getById(id) {
    return await JourneyCategory.findById(id);
  }

  static async update(id, data) {
    const { error } = JourneyCategory.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await JourneyCategory.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await JourneyCategory.findByIdAndDelete(id);
  }
}

module.exports = JourneyCategoryService;
