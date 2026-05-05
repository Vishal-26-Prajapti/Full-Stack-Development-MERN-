import User from "../models/User.js";

export const saveFace = async (req, res) => {
  try {
    const { descriptor } = req.body;

    if (!descriptor) {
      return res.status(400).json({ message: "No descriptor provided" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.faceDescriptor = JSON.stringify(descriptor);

    await user.save();

    res.json({ message: "Face data saved successfully" });
  } catch (error) {
    console.log("SAVE FACE ERROR:", error); 
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "faceDescriptor"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
