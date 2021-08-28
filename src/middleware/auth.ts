import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Admin from "../models/Admin";
import { IAdmin } from "../interfaces/IAdmin";

export default async function authMiddleware(request: Request, response: Response, next: NextFunction){
  const { authorization } = request.headers;  
  console.log(request.headers);
  if(!authorization){
    return response.status(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  if(!token){
    return response.status(401).send({ message: 'Access denied.' });
  }

  try{
    const adminToken = jwt.verify(String(token), String(process.env.TOKEN_SECRET)) as IAdmin;
    const admin = await Admin.findById(adminToken.id);
    
    if(!admin){
      return response.status(400).send({ message: 'Admin not exists.' });
    }

  }catch(error){
    return response.status(401).send({ message: 'Invalid token.' });
  }

  return next();
}