import { User } from '../db/schema.js';

/**
 * Fetch user details
 */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` is populated by auth middleware
    const user = await User.findById(userId).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

/**
 * Edit and update user details
 */
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Use the spread operator to include hasConsented, notificationSettings, etc.
    const updates = { ...req.body };

    // Find the user and update with the dynamic updates object
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates }, // Use $set to ensure only provided fields are touched
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};