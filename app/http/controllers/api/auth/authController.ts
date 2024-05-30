import { Request, Response } from 'express';
import User from '../../../../models/user';
import { IUser } from '../../../../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


  // Register endpoint
  export const register = async (req: Request, res: Response) => {
    console.log('register');
    try {
      //const { email, password }: { email: string; password: string } = req.body;
      const { name, password }: { name: string; password: string } = req.body;

      // Check if the user already exists
      const existingUser: IUser | null = await User.findOne({ name });
      if (existingUser) {
        console.log('user already exists');
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser: IUser = new User({
        name,
        //email,
        password: hashedPassword,
      });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Login endpoint
  export const login = async (req: Request, res: Response) => {
    try {
      //const { email, password }: { email: string; password: string } = req.body;
      const { name, password }: { name: string; password: string } = req.body;

      // Find the user by email
      //const user: IUser | null = await User.findOne({ email });
      const user: IUser | null = await User.findOne({ name });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Password reset endpoint
  export const resetPassword = async (req: Request, res: Response) => {
    try {
      //const { email }: { email: string } = req.body;
      const { name }: { name: string } = req.body;

      // Find the user by email
      //const user: IUser | null = await User.findOne({ email });
      const user: IUser | null = await User.findOne({ name });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a new password
      const newPassword = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Send the new password to the user (e.g., via email)
      // Replace this with your actual email sending logic
      console.log(`New password: ${newPassword}`);

      res.json({ message: 'Password reset instructions sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
