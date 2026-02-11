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
        userId: Number(userId) // Ensure userId is a number if your schema expects it
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
      where: { userId: Number(userId) },
      orderBy: { id: 'desc' } // Newest tasks at the top
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

    // Use updateMany to ensure only the owner can update it
    const updated = await prisma.task.updateMany({
      where: { 
        id: Number(id), // Convert string param to number
        userId: Number(userId) 
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
        id: Number(id), 
        userId: Number(userId) 
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