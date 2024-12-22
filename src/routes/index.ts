import { Router } from "express";
import { contactLimiter, sendEmail } from "../controllers/email.controller";
import { getProjectById, getProjects } from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);
router.get("/project/:id", getProjectById);
router.post("/api/contact", contactLimiter, sendEmail);

export default router;
