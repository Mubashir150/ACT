import {SessionTemplate} from "../db/schema.js";
export const getSessionTemplate = async (req, res) => {
    try {
      const { sessionNumber } = req.params;
  
      // Find the template based on the sessionNumber (1, 2, 3, etc.)
      const template = await SessionTemplate.findOne({ 
        sessionNumber: parseInt(sessionNumber) 
      });
  
      if (!template) {
        return res.status(404).json({ message: "Session template not found." });
      }
  
      res.status(200).json(template);
    } catch (error) {
      console.error("Error fetching session template:", error);
      res.status(500).json({ message: "Server error while fetching template." });
    }
  };