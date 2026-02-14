import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/schema.js'; // Import the User model
import dotenv from 'dotenv';

dotenv.config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure key in production

/**
 * Register a new user
 */

const generateMfaCode = () => Math.floor(100000 + Math.random() * 900000).toString();
export const register = async (req, res) => {
  try {
    const { name, email, password, role,license, clinicId } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const mfaCode = generateMfaCode();

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      license,
      clinicId,
      mfaCode,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.status(201).json({
  message: 'User registered successfully',
  tempCode: mfaCode,
  token,
  user: {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    
  },
  });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

/**
 * Login a user
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const mfaCode = generateMfaCode();
    user.mfaCode = mfaCode; // Update the code on every login attempt
    await user.save();

    res.status(200).json({ 
      message: 'MFA Required', 
      tempCode: mfaCode, // DELETE THIS when you switch to email
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
};

export const verifyMfa = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.mfaCode !== code) {
      return res.status(401).json({ message: 'Invalid MFA code' });
    }

    // Clear code after successful use
    user.mfaCode = null; 
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      token, 
      role:user.role,
      user: { _id: user._id, name: user.name, email: user.email,role:user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Verification error' });
  }
};