const Collaborator = require("../models/Collaborator");

class CollaboratorService {
  static async create(data) {
    const { error } = Collaborator.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await Collaborator.create(data);
  }

  static async getAll() {
    return await Collaborator.find();
  }

  static async getById(id) {
    return await Collaborator.findById(id);
  }

  static async update(id, data) {
    const { error } = Collaborator.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await Collaborator.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Collaborator.findByIdAndDelete(id);
  }
}

module.exports = CollaboratorService;
