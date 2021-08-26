import { Request, Response } from "express";
import { IFlag } from "../interfaces/IFlag";
import User from "../models/User";
import Flag from "../models/Flag";

const createUser = async (request: Request, response: Response) => {
  const { name, email } = request.body;

  try{
    //Check if user exists
    if(await User.findOne({ email })){
      return response.status(400).send({ error: 'User already exists. '});
    }

    const user = await User.create({ name, email });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getAllUsers = async (request: Request, response: Response) => {
  try{
    const users = await User.find().populate('flags');

    return response.send({ users: users });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getUser = async (request: Request, response: Response) => {
  try{
    const user = await User.findById(request.params.userId).populate('flags');

    return response.status(200).send({ user });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const updateUser = async (request: Request, response: Response) => {
  try{
    const { name, email, flags } = request.body;

    const user = await User.findByIdAndUpdate(request.params.userId, {
      name,
      email
    }).populate('flags');
    
    if(!user){
      return response.status(400).send({ error: 'User not found.' });
    }
    
    user.flags = [];

    await Promise.all(flags.map(async (flag: IFlag) => {
      const userFlag = await Flag.findById(flag.id);
      
      if(userFlag){
        await userFlag.save();
        user.flags.push(userFlag);
      }
    }));

    await user.save();

    return response.send({ user });
  }catch(error){
    return response.send({ error: error.message });
  }
}

const removeUser = async (request: Request, response: Response) => {
  try{
    await User.findByIdAndDelete(request.params.userId);
    
    return response.status(200).send('User deleted.');
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

export default { createUser, getAllUsers, getUser, updateUser, removeUser }