import { Request, Response } from 'express';

const User = require('../models/User');

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Successfully deleted user' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    await User.create(req.body);
    res.status(200).json({ message: 'Successfully Created User' })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  createUser
};