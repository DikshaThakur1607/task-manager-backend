import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'my_permanent_secret_key_12345';

export const signup = async (req: Request, res: Response) => {
  try {
    // Look inside req.body.body
    const { email, password } = req.body.body; 
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    const { password: _, ...userSafe } = newUser;
    res.status(201).json(userSafe);
  } catch (error) {
    console.error(error); // This helps you see the REAL error in Render logs
    res.status(400).json({ error: "Signup failed." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Look inside req.body.body
    const { email, password } = req.body.body; 

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true } });
  res.json(users);
};