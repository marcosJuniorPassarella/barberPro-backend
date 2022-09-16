import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

// --- USER ROUTES ---
router.post("/users", new CreateUserController().handle);

export { router };
