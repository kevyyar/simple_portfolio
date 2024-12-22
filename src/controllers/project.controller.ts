import { Request, Response } from "express";
import { Project } from "../models/project.model";

// Get all projects from the DB
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.render("index", {
      title: "My Portfolio",
      description: "Welcome to my portfolio website",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Error fetching projects");
  }
};

// New method to get a single project
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).render("error", {
        message: "Project not found",
      });
    }

    res.render("project", {
      title: project.title,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).send("Error fetching project");
  }
};
