import { Router, Request, Response } from "express";
import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// --- USER ROUTES ---
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// ---HAIRCUT ROUTES ---
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);
router.get("/haircut/check", isAuthenticated, new CheckSubscriptionController().handle);

export { router };
