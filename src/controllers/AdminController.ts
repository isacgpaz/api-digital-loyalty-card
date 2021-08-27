import { Request, Response } from "express";
import Admin from "../models/Admin";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function generateToken(params = {}){
  return jwt.sign(params, String(process.env.TOKEN_SECRET), {
    expiresIn: 86400 //24h
  });
}

const createAdmin = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try{
    //Check if admin exists
    if(await Admin.findOne({ email })){
      return response.status(400).send({ error: 'Admin already exists. '});
    }

    const admin = await Admin.create({ name, email, password });

    //Clear password
    admin.password = String(undefined);

    return response.send({
      admin, token: generateToken({ 'id': admin.id })
    });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const auth = async (request: Request, response: Response) => {
  try{
    const { email, password } = request.body;

    const admin = await Admin.findOne({ email: email}).select('+password');

    //Check if Admin exists
    if(!admin){
      return response.status(400).send({ error: 'Admin not found.' });
    }

    //Compare password input with bcrypted Admin password
    if(!await bcrypt.compare(password, admin.password)){
      return response.status(400).send({ error: 'Invalid password.' });
    }

    //Clear password
    admin.password = String(undefined);

    return response.status(201).send({
      admin,
      token: generateToken({ 'id': admin.id })
    });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getAllAdmins = async (request: Request, response: Response) => {
  try{
    const admins = await Admin.find();

    return response.send({ admins: admins });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getAdmin = async (request: Request, response: Response) => {
  try{
    const admin = await Admin.findById(request.params.adminId);

    return response.status(200).send({ admin });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const updateAdmin = async (request: Request, response: Response) => {
  try{
    const { name, email, password } = request.body;

    const admin = await Admin.findByIdAndUpdate(request.params.AdminId, {
      name,
      email,
      password,
    });
    
    if(!admin){
      return response.status(400).send({ error: 'Admin not found.' });
    }
    
    admin.password = password;

    await admin.save();

    return response.send({ admin });
  }catch(error){
    return response.send({ error: error.message });
  }
}

const removeAdmin = async (request: Request, response: Response) => {
  try{
    await Admin.findByIdAndDelete(request.params.AdminId);
    
    return response.status(200).send('Admin deleted.');
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

export default { createAdmin, auth, getAllAdmins, getAdmin, updateAdmin, removeAdmin }