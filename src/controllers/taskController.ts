import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req: any, res: Response) => {
  try {
    const { title } = req.body;
    const userId = req.user.userId;

    const newTask = await prisma.task.create({
      data: {
        title,
        // Removed Number() - Neon/Prisma usually expects String/UUID for these IDs
        userId: String(userId) 
      }
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getMyTasks = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const tasks = await prisma.task.findMany({
      // Ensure userId is treated as a string
      where: { userId: String(userId) },
      orderBy: { id: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params; 
    const { completed } = req.body;
    const userId = req.user.userId;

    const updated = await prisma.task.updateMany({
      where: { 
        id: String(id), // IDs are strings in your cloud DB
        userId: String(userId) 
      },
      data: { completed }
    });

    if (updated.count === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const deleted = await prisma.task.deleteMany({
      where: { 
        id: String(id), 
        userId: String(userId) 
      }
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};