import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getAUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  res.json({
    message: "User created successfully",
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Login successfully",
    user,
    token,
  });
};
